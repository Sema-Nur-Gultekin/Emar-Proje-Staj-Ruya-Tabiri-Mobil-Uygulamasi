import { Alert, View, TouchableOpacity, Text, ScrollView, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import { styles } from '../stil.js';
import { useState, useEffect } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation.tsx';
import { SayfaGecis } from '../SayfaGecis.tsx';

// Bu ekranın alacağı parametrelerin tipini, RootStackParamList'ten alarak tanımlıyoruz.
type TabirScreenRouteProp = RouteProp<RootStackParamList, 'Tabir'>;

export function RuyaYorumlama() {

    const arkaPlanResmi = require("../arkaPlan1.jpg");

    const route = useRoute<TabirScreenRouteProp>();
    const { ruyaMetni } = route.params;

    const [tabir, setTabir] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    //useEffect(() => { ApiIslemi('Özet rüya tabiri yap. Rüya metni: '); }, []);

    useEffect(() => {
        // RuyaAlma sayfasından gönderilen özel bir parametre olup olmadığını kontrol et
        if (route.params?.istekTipi) {
            ApiIslemi(route.params.istekTipi);
        }
    }, [route.params]);

    const ApiIslemi = async (istekTipi: string) => {

        setIsLoading(true);
        setTabir('Tabiriniz Yapılıyor...');

        const baglanti = "http://10.0.2.2:3000";

        try {

            const response = await fetch(`${baglanti}/api/generate`, {
                method: 'POST', // Post veri yollamak için kullanılır GET veri almak için 
                headers: { 'Content-Type': 'application/json' }, // bilgisayara json formatında veri yollayacağımızı belirtiriz 
                body: JSON.stringify({ prompt: `${istekTipi}${ruyaMetni}` }), // burada json metnine çeviriyoruz promptumuzu 
            });

            if (!response.ok) {
                throw new Error(`HTTP hata kodu: ${response.status}`);
            }

            const data = await response.json(); // sunucudan gelen veriyi alıyoruz 
            setTabir(data.reply);

        }
        catch (hata) {

            console.error("Hata: ", hata)
            setTabir('Rüya tabiriniz yapılamadı. Lütfen daha sonra tekrar deneyin.');
            Alert.alert("Hata", "Rüyanız tabirlenirken bir sorun oluştu.");

        }
        finally {

            setIsLoading(false);

        }
    }

    return (

        <ImageBackground source={arkaPlanResmi} style={styles.arkaPlanResmiTasarimi}>

            <View style={styles.anaTasarim}>

                <TouchableOpacity>

                    <ScrollView style={{
                        maxHeight: 45,
                        width: '80%',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        padding: 10,
                        borderRadius: 10,
                        marginTop: 5,
                    }} >
                        <Text style={{
                            textAlign: 'center',
                            color: 'white',
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginTop: 5,
                        }} > Rüyanız: {ruyaMetni} </Text>
                    </ScrollView>

                </TouchableOpacity>
                <TouchableOpacity>

                    <ScrollView style={styles.ScrollViewTasarimi} >
                        <Text style={{ color: 'white' }}>{tabir}</Text>
                    </ScrollView>

                </TouchableOpacity>
                <TouchableOpacity>

                    <Button style={{ margin: 5 }}
                        buttonColor="#ffffffff"
                        textColor='black'
                        mode="contained"
                        onPress={() => ApiIslemi('Detaylı rüya tabiri yap. Rüya metni: ')}> Detaylı Tabir </Button>

                    <Button style={{ margin: 5 }}
                        buttonColor="#ffffffff"
                        textColor='black'
                        mode="contained"
                        onPress={() => ApiIslemi('Rüyayın dine göre tabirini yap. Rüya metni: ')}> Dini Tabir </Button>

                    <Button style={{ margin: 5 }}
                        buttonColor="#ffffffff"
                        textColor='black'
                        mode="contained"
                        onPress={() => ApiIslemi('Rüyanın psikolojik tabirini yap. Rüya metni: ')}> Psikolojik Tabir </Button>

                    <Button style={{ margin: 5 }}
                        buttonColor="#ffffffff"
                        textColor='black'
                        mode="contained"
                        onPress={() => ApiIslemi('Rüyanın nörolojik tabirini yap. Rüya metni: ')}> Nörolojik Tabir </Button>

                    <Button style={{ margin: 5 }}
                        buttonColor="#ffffffff"
                        textColor='black'
                        mode="contained"
                        onPress={() => ApiIslemi('Rüyanın kültürel ve antropolojik tabirini yap. Rüya metni: ')}> Kültürel ve Antropolojik Tabir </Button>

                    <Button style={{ margin: 5 }}
                        buttonColor="#ffffffff"
                        textColor='black'
                        mode="contained"
                        onPress={() => ApiIslemi('Rüyanın spiritüel ve metafizik tabirini yap. Rüya metni: ')}>Spiritüel ve MetaFizik Tabir </Button>

                </TouchableOpacity>

                <SayfaGecis />

            </View>
        </ImageBackground>

    )
}