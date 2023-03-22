import { NavigationContainer, Theme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigationOptions } from "@react-navigation/stack/lib/typescript/src/types";
import { useFonts } from "expo-font";
import { Text, Image } from "react-native";
import "react-native-gesture-handler";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Resident from "./src/screens/Resident";
import ResidentHome from "./src/screens/ResidentHome";
import SignUpScreen from "./src/screens/Signup";
import Visitor from "./src/screens/Visitor";
import BackButton from "./assets/icons/back-button.png";
import Container from "./src/components/Container/Container";
import common from "./constants/Styles";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

const headerHidden: StackNavigationOptions = {
  headerShown: false,
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "PTMono-Regular": require("./assets/fonts/PTMono-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container style={common.container}>
      <StatusBar style="light" />
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="Home" screenOptions={MyStack}>
          <Stack.Screen name="Home" component={Home} options={headerHidden} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ResidentHome" component={ResidentHome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Visitor" component={Visitor} />
          <Stack.Screen name="Resident" component={Resident} />
        </Stack.Navigator>
      </NavigationContainer>
    </Container>
  );
}

const MyTheme: Theme = {
  dark: true,
  colors: {
    primary: "rgb(10, 132, 255)",
    background: "rgb(1, 1, 1)",
    card: "rgb(8, 10, 12)",
    text: "rgb(255, 255, 255)",
    border: "rgb(8, 10, 12)",
    notification: "rgb(255, 69, 58)",
  },
};

const MyStack: StackNavigationOptions = {
  headerTitleAlign: "center",
  headerBackImage: () => (
    <Image
      source={BackButton}
      style={{ height: 15, width: 15, position: "absolute" }}
    />
  ),
  headerStatusBarHeight: 20,
  headerTitleStyle: {
    fontSize: 30,
    fontFamily: "PTMono-Regular",
  },
  gestureEnabled: true,
  gestureDirection: "horizontal",
};
