import { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { styles } from '../stil.js';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation';
import { SayfaGecis } from '../SayfaGecis.tsx';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function RuyaAlma() {


    const ruyatepkiKayit = async () => {

        try {

            const userId = await AsyncStorage.getItem("userId");

            if (!userId) {
                Alert.alert("Hata", "Kullanıcı ID bulunamadı, tekrar giriş yapın.");
                return;
            }

            const response = await fetch('http://10.0.2.2:5000/RuyaTepkiKayit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: Number(userId), // backend Int bekliyor
                    ruya,
                    tepki,
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                Alert.alert("Başarılı", data.message);
                //nav.navigate('Tabir', { ruyaMetni: ruya });
                nav.navigate('Tabir', { ruyaMetni: ruya, istekTipi: 'Özet rüya tabiri yap. Rüya metni: ' });
            } else {

                const errorMessage = data.errorDetail ? data.errorDetail : data.message;
                Alert.alert("Hata", errorMessage);
            }

        } catch (error) {
            console.error("Kayıt işlemi sırasında hata oluştu: ", error);
            Alert.alert("Hata", "Kayıt yapılamadı. Lütfen tekrar deneyin.");
        }

    }

    const arkaPlanResmi = require("../arkaPlan1.jpg");

    // useNavigation hook'una tip tanımını veriyoruz.
    const nav = useNavigation<NavigationProp<RootStackParamList>>();

    const [ruya, setRuya] = useState('');
    const [tepki, setTepki] = useState('');

    return (

        <ImageBackground source={arkaPlanResmi} style={styles.arkaPlanResmiTasarimi}>

            <View style={styles.anaTasarim}>

                <TouchableOpacity>

                    <Text style={styles.metinTasarimi} > RÜYA TABİRİM </Text>

                </TouchableOpacity>

                <TextInput style={styles.metinGirisiTasarimi}
                    label="Rüyanızı Giriniz:"
                    value={ruya}
                    onChangeText={setRuya}
                    multiline />

                <ScrollView style={{
                    maxHeight: 270,
                    width: '65%',
                    padding: 10,
                    borderRadius: 10,
                    marginTop: 20,

                }}>

                    <TouchableOpacity onPress={() => setTepki('😊Eğlenceli')} style={styles.tepkiTasarimi}>
                        <Text style={{ fontSize: 17, textAlign: 'center' }}>😊Eğlenceli</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setTepki('😂Komik')} style={styles.tepkiTasarimi}>
                        <Text style={{ fontSize: 17, textAlign: 'center' }}>😂Komik</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setTepki('🤔Şaşırtıcı')} style={styles.tepkiTasarimi}>
                        <Text style={{ fontSize: 17, textAlign: 'center' }}>🤔Şaşırtıcı</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setTepki('😱Kabus')} style={styles.tepkiTasarimi}>
                        <Text style={{ fontSize: 17, textAlign: 'center' }}>😱Kabus</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setTepki('❔Garip,Anlamsız')} style={styles.tepkiTasarimi}>
                        <Text style={{ fontSize: 17, textAlign: 'center' }}>❔Garip,Anlamsız</Text>
                    </TouchableOpacity>

                </ScrollView>

                <Button style={{ margin: 10 }}
                    buttonColor="#ffffffff"
                    textColor='black'
                    mode="contained"
                    onPress={ruyatepkiKayit} > RÜYAYI TABİRLE VE KAYDET </Button>

                <SayfaGecis />

            </View>
        </ImageBackground >

    )
}