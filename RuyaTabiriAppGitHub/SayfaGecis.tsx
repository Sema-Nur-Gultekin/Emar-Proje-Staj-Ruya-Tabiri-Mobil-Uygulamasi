import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useNavigationState, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './Navigation';


export const SayfaGecis = () => {

    const nav = useNavigation<NavigationProp<RootStackParamList>>();

    // useNavigationState hook'u ile navigasyon yığınının güncel durumunu alıyoruz
    const state = useNavigationState(state => state);
    const aktifSayfa = state.routes[state.index].name;

    const getButtonStyle = (sayfaAdi: keyof RootStackParamList) => ({
        color: aktifSayfa === sayfaAdi ? '#9900ffff' : 'black',
    });

    return (

        <View style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'transparent',
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                height: 60,
                borderRadius: 100,
                marginHorizontal: 20,
                marginBottom: 20,
            }}>
                <TouchableOpacity
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => nav.navigate('Ana_Sayfa')}
                >
                    <Text style={{ fontSize: 24, ...getButtonStyle('Ana_Sayfa') }}>✎</Text>
                    <Text style={{ fontSize: 12, ...getButtonStyle('Ana_Sayfa') }}>Rüya Alma</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => nav.navigate('Tabir', { ruyaMetni: '' })}
                >
                    <Text style={{ fontSize: 24, ...getButtonStyle('Tabir') }}>☶</Text>
                    <Text style={{ fontSize: 12, ...getButtonStyle('Tabir') }}>Yorumlama</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => nav.navigate('Geçmiş')}
                >
                    <Text style={{ fontSize: 24, ...getButtonStyle('Geçmiş') }}>◴</Text>
                    <Text style={{ fontSize: 12, ...getButtonStyle('Geçmiş') }}>Geçmiş</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => nav.navigate('KullaniciGiris')}
                >
                    <Text style={{ fontSize: 24, ...getButtonStyle('KullaniciGiris') }}>⏏</Text>
                    <Text style={{ fontSize: 12, ...getButtonStyle('KullaniciGiris') }}>Giriş</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};