import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Visitor from './src/screens/Visitor';
import Resident from './src/screens/Resident';
import SignUpScreen from './src/screens/Signup';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'PTMono-Regular': require('./assets/fonts/PTMono-Regular.ttf'),
  });
  // if(fontsLoaded){
  //   return (
  //     <SignUpScreen />
  //   )
  // }



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUpScreen">
       <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Visitor" component={Visitor} />
        <Stack.Screen name="Resident" component={Resident} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
