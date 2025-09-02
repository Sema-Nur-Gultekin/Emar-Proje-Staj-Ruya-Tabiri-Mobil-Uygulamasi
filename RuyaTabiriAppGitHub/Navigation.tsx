import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { RuyaAlma } from "./RuyaAlma/RuyaAlma";
import { RuyaYorumlama } from "./RuyaYorumlama/RuyaYorumlama";
import { KullaniciGiris } from "./KullaniciGiris/KullaniciGiris";
import { Gecmis } from "./Gecmis/Gecmis";
import { KayitOl } from "./KayitOl/KayitOl";

export type RootStackParamList = {
    Kayıt_Ol: undefined
    Geçmiş: undefined;
    KullaniciGiris: undefined;
    Ana_Sayfa: undefined;
    Tabir: { ruyaMetni: string, istekTipi?: string };
};

// `createStackNavigator`'a tip tanımımızı iletiyoruz.
const stack = createStackNavigator<RootStackParamList>();

export const Navigation = () => {
    return (
        <NavigationContainer>

            <stack.Navigator>

                <stack.Screen name="KullaniciGiris" component={KullaniciGiris} options={{
                    headerShown: false,
                }} />

                <stack.Screen name="Kayıt_Ol" component={KayitOl} options={{
                    headerTransparent: true,
                }} />

                <stack.Screen name="Ana_Sayfa" component={RuyaAlma} options={{
                    headerShown: false,
                }} />

                <stack.Screen name="Geçmiş" component={Gecmis} options={{
                    headerShown: false,
                }} />

                <stack.Screen name="Tabir" component={RuyaYorumlama} options={{
                    headerShown: false,
                }} />

            </stack.Navigator>

        </NavigationContainer>
    )
}