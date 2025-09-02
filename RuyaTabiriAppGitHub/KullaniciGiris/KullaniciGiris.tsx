import { useState } from 'react';
import { View, Text, ImageBackground, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { styles } from '../stil.js';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function KullaniciGiris() {

    const arkaPlanResmi = require("../arkaPlan1.jpg");

    const nav = useNavigation<NavigationProp<RootStackParamList>>();

    const [kullaniciAdi, setKullaniciAdi] = useState<string>();
    const [parola, setParola] = useState<string>();
    const [parolaGorunur, setParolaGorunur] = useState(true);

    const handleGiris = async () => {
        try {

            const response = await fetch('http://10.0.2.2:5000/giris', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    kullaniciAdi,
                    parola,
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {

                // Kullanıcı ID’sini sakla
                await AsyncStorage.setItem("userId", data.userId.toString());

                Alert.alert("Başarılı", data.message);
                nav.navigate('Ana_Sayfa');
            } else {

                const errorMessage = data.errorDetail ? data.errorDetail : data.message;
                Alert.alert("Hata", errorMessage);
            }
        } catch (error) {
            console.error("Giriş işlemi sırasında hata oluştu: ", error);
            Alert.alert("Hata", "Giriş yapılamadı. Lütfen tekrar deneyin.");
        }
    };

    return (

        <ImageBackground source={arkaPlanResmi} style={styles.arkaPlanResmiTasarimi}>

            <View style={styles.anaTasarim}>

                <Text style={styles.metinTasarimi}> KULLANICI ADI</Text>
                <TextInput style={styles.metinGirisiTasarimi}
                    label="Kullanıcı Adı:"
                    value={kullaniciAdi}
                    onChangeText={setKullaniciAdi}
                    maxLength={50}
                />

                <Text style={styles.metinTasarimi}> PAROLA</Text>
                <TextInput style={styles.metinGirisiTasarimi}
                    label="Parola:"
                    secureTextEntry={parolaGorunur}
                    right={<TextInput.Icon
                        icon={parolaGorunur ? 'eye' : 'eye-off'}
                        onPress={() => setParolaGorunur(!parolaGorunur)}
                    />}
                    value={parola}
                    onChangeText={setParola}
                    maxLength={50}
                />

                <Button buttonColor="#ffffffff"
                    textColor='black'
                    mode="contained"
                    onPress={handleGiris}
                    style={{
                        marginTop: 10,
                        marginBottom: 5,
                    }}
                >GİRİŞ YAP</Button>

                <Text style={{ marginTop: 5, color: 'white' }} onPress={() => nav.navigate('Kayıt_Ol')}>Kayıt Ol</Text>

            </View>
        </ImageBackground>
    );
}