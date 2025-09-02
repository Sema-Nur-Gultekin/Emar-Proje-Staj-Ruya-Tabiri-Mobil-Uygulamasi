import { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Alert, FlatList, ActivityIndicator } from 'react-native';
import { styles } from '../stil.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SayfaGecis } from '../SayfaGecis.tsx';

interface RuyaKaydi {
    TARIH: string;
    RUYA: string;
    TEPKI: string;
}

export function Gecmis() {
    const arkaPlanResmi = require("../arkaPlan1.jpg");

    const [ruyalar, setRuyalar] = useState<RuyaKaydi[]>([]);
    const [yukleniyor, setYukleniyor] = useState(true);

    useEffect(() => {
        const fetchGecmisRuyalar = async () => {
            try {
                const userId = await AsyncStorage.getItem("userId");

                if (!userId) {
                    Alert.alert("Hata", "Kullanıcı ID bulunamadı, tekrar giriş yapın.");
                    setYukleniyor(false);
                    return;
                }

                const response = await fetch(`http://10.0.2.2:5000/gecmis/${userId}`);
                const data = await response.json();

                if (response.ok && data.success) {
                    setRuyalar(data.data);
                } else {
                    const errorMessage = data.errorDetail ? data.errorDetail : data.message;
                    Alert.alert("Hata", errorMessage);
                }
            } catch (error) {
                console.error("Geçmiş rüyalar yüklenirken hata oluştu: ", error);
                Alert.alert("Hata", "Geçmiş rüyalar yüklenemedi. Lütfen tekrar deneyin.");
            } finally {
                setYukleniyor(false);
            }
        };

        fetchGecmisRuyalar();
    }, []);

    const renderItem = ({ item }: { item: RuyaKaydi }) => (
        <View style={styles.gecmisItemTasarimi}>
            <Text style={{ color: 'white' }}>Tarih: {new Date(item.TARIH).toLocaleDateString()}</Text>
            <Text style={{ color: 'white' }}>Rüya: {item.RUYA}</Text>
            <Text style={{ color: 'white' }}>Tepki: {item.TEPKI}</Text>
        </View>
    );

    return (
        <ImageBackground source={arkaPlanResmi} style={styles.arkaPlanResmiTasarimi}>
            <View style={styles.anaTasarim}>
                <Text style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: 100,
                    marginBottom: 50,
                }}>GEÇMİŞ RÜYALARIM</Text>

                {yukleniyor ? (
                    <ActivityIndicator size="large" color="#fff" />
                ) : ruyalar.length > 0 ? (
                    <FlatList
                        data={ruyalar}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                        style={{
                            width: '90%',
                            marginBottom: 100,
                        }}
                    />
                ) : (
                    <Text style={{ color: 'white', fontSize: 18 }}>Henüz bir rüya kaydınız yok.</Text>
                )}

                <SayfaGecis />
            </View>
        </ImageBackground>
    );
}