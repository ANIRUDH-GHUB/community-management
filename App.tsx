import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'PTMono-Regular': require('./assets/fonts/PTMono-Regular.ttf'),
  });
  if(fontsLoaded){
    return (
      <Login />
    )
  }
  return <View style={styles.container}>
    <Text>Loading ...</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
