require("dotenv").config();

const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const sqlConfig = {
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
};

sql.connect(sqlConfig).then(pool => {
    console.log("SQL Server'a başarıyla bağlanıldı");
    return pool;
}).catch(err => {
    console.error("Veritabanı bağlantı hatası: ", err);
});

app.post("/giris", async (req, res) => {
    const { kullaniciAdi, parola } = req.body;

    try {
        const pool = await sql.connect(sqlConfig);
        const result = await pool.request()
            .input('kullaniciAdi', sql.NVarChar, kullaniciAdi)
            .input('parola', sql.NVarChar, parola)
            .query('SELECT ID, KULLANICI_ADI FROM TBL_KULLANICI WHERE KULLANICI_ADI = @kullaniciAdi AND PAROLA = @parola');

        if (result.recordset.length > 0) {

            res.status(200).send({ success: true, message: "Giriş başarılı", userId: result.recordset[0].ID });
        } else {
            res.status(401).send({ success: false, message: "Kullanıcı adı veya parola yanlış" });
        }
    } catch (err) {
        console.error("Giriş hatası: ", err);
        res.status(500).send({ success: false, message: "Sunucu hatası", errorDetail: err.message });
    }
});

app.post("/kayit", async (req, res) => {
    const { kullaniciAdi, parola } = req.body;

    try {
        const pool = await sql.connect(sqlConfig);

        const existingUser = await pool.request()
            .input('kullaniciAdi', sql.NVarChar, kullaniciAdi)
            .query('SELECT ID FROM TBL_KULLANICI WHERE KULLANICI_ADI = @kullaniciAdi');

        if (existingUser.recordset.length > 0) {
            return res.status(409).send({ success: false, message: "Bu kullanıcı adı zaten mevcut" });
        }

        await pool.request()
            .input('kullaniciAdi', sql.NVarChar, kullaniciAdi)
            .input('parola', sql.NVarChar, parola)
            .query('INSERT INTO TBL_KULLANICI (KULLANICI_ADI, PAROLA) VALUES (@kullaniciAdi, @parola)');

        res.status(201).send({ success: true, message: "Kayıt başarılı" });

    } catch (err) {
        console.error("Kayıt hatası: ", err);
        res.status(500).send({ success: false, message: "Sunucu hatası", errorDetail: err.message });
    }
});

app.post("/RuyaTepkiKayit", async (req, res) => {

    const { userId, ruya, tepki } = req.body;

    try {

        const pool = await sql.connect(sqlConfig);
        await pool.request()
            .input('id', sql.Int, userId)
            .input('tarih', sql.Date, new Date())
            .input('ruya', sql.NVarChar, ruya)
            .input('tepki', sql.NVarChar, tepki)
            .query('INSERT INTO TBL_RUYA_TABIR (ID, TARIH, RUYA, TEPKI) VALUES (@id, @tarih, @ruya, @tepki)');

        res.status(201).send({ success: true, message: "Kayıt başarılı" });

    }
    catch (err) {
        console.error("Kayıt hatası: ", err);
        res.status(500).send({ success: false, message: "Sunucu hatası", errorDetail: err.message });
    }

});

app.get("/gecmis/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const pool = await sql.connect(sqlConfig);
        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .query('SELECT TARIH, RUYA, TEPKI FROM TBL_RUYA_TABIR WHERE ID = @userId ORDER BY TARIH DESC');

        res.status(200).send({ success: true, data: result.recordset });

    } catch (err) {
        console.error("Geçmiş rüyaları alırken hata oluştu: ", err);
        res.status(500).send({ success: false, message: "Sunucu hatası", errorDetail: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});