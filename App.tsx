import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import ResidentHome from './src/screens/ResidentHome';
import Visitor from './src/screens/Visitor';
import Resident from './src/screens/Resident';
import SignUpScreen from './src/screens/Signup';
import { useFonts } from 'expo-font';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Resident" component={Resident} />
      <Tab.Screen name="Visitor" component={Visitor} />
    </Tab.Navigator>
  );
}

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
  if(!fontsLoaded){
    return (
      <Text>Loading...</Text>
    )
  }

  
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
       <Stack.Screen name="SignUp" component={SignUpScreen} />
       <Stack.Screen name="residentHome" component={MainTabNavigator} />
       <Stack.Screen name="Home" component={Home} />
       <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="visitor" component={Visitor} />
        <Stack.Screen name="resident" component={Resident} />
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
