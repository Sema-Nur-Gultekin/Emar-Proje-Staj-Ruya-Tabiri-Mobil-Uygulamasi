import { StyleSheet, TouchableOpacity } from 'react-native';

export const styles = StyleSheet.create({

  arkaPlanResmiTasarimi: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  ScrollViewTasarimi: {
    maxHeight: 300,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  metinGirisiTasarimiRuyaYorumlamaOzel: {
    width: '80%',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  metinGirisiTasarimi: {
    width: '50%',
    marginTop: 20,
    borderRadius: 10,
  },
  metinTasarimi: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  tepkiTasarimi: {
    borderRadius: 100,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.54)',
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    marginTop: 20,
  },
  anaTasarim: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TouchableOpacityArkaPlanRengi: {
    backgroundColor: 'gray',
  },
  gecmisItemTasarimi: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
});