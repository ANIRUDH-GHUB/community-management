import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { StyleSheet, Text } from "react-native";
import "react-native-gesture-handler";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Resident from "./src/screens/Resident";
import SignUpScreen from "./src/screens/Signup";
import Visitor from "./src/screens/Visitor";

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
    "PTMono-Regular": require("./assets/fonts/PTMono-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ResidentHome" component={MainTabNavigator} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Visitor" component={Visitor} />
        <Stack.Screen name="Resident" component={Resident} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
