/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { Navigation } from './Navigation.tsx';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';


function App(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>

      <SafeAreaProvider>
        <PaperProvider>

          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

          <Navigation />

        </PaperProvider>
      </SafeAreaProvider>

    </>

  );
}

export default App;