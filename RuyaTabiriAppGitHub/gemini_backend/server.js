require("dotenv").config();

const express = require("express");           // Web sunucusu kurmak için
const cors = require("cors");                 // Farklı sitelerden istek almayı açmak için
const helmet = require("helmet");             // Güvenlik için HTTP başlıklarını ayarlamak için
const rateLimit = require("express-rate-limit"); // Çok fazla istek yapılmasını engellemek için
const { GoogleGenerativeAI } = require("@google/generative-ai"); // Gemini API’sini kullanmak için

// Express uygulamasını başlatıyoruz
const app = express();

// Middleware = İstek (request) ile cevap (response) arasına giren yardımcı araçlar
app.use(cors());          // Farklı sitelerden gelen isteklere izin ver (Frontend-Backend iletişimi için gerekli)
app.use(helmet());        // Sunucuyu bazı saldırılara karşı korur
app.use(express.json());  // Gönderilen verilerin JSON formatında okunmasını sağlar

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: "Çok fazla istek gönderdiniz, lütfen 1 dakika sonra tekrar deneyin."
});
// Bu sınırlamayı tüm endpointlere uygula
app.use(limiter);

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("Hata: GEMINI_API_KEY bulunamadı. Lütfen .env dosyasını kontrol edin.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/", (req, res) => {
    res.send("Gemini Backend Çalışıyor");
});

app.post("/api/generate", async (req, res) => {
    // Kullanıcıdan gelen JSON içindeki prompt bilgisini al
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Lütfen bir prompt (metin) sağlayın." });
    }

    try {
        // Modelin cevap verme tarzını ayarlıyoruz
        const generationConfig = {
            temperature: 0.7, // Yaratıcılık seviyesi (0 = kesin, 1 = daha rastgele)
            topP: 0.95,       // Olasılık dağılımı (çeşitliliği kontrol eder)
            topK: 40,         // Daha fazla kelime seçeneği arasından karar verir
        };

        // Gemini API’ye kullanıcıdan gelen prompt’u gönderiyoruz
        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }]
                }
            ],
            generationConfig, // Ayarları kullan
        });

        // API’den gelen yanıtı alıyoruz
        const response = result.response;
        const text = response.text();


        res.json({ reply: text });
    } catch (error) {

        console.error("Gemini API hatası:", error);
        res.status(500).json({ error: "Rüya tabir edilirken bir hata oluştu." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));
