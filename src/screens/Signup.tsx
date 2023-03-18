import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Button} from "react-native";


interface SignupProps {
  navigation: any;
}

const SignUpScreen: React.FC<SignupProps> = ({ navigation }) => {
  const handlePress = (screenName: string) => {
    console.log(screenName)
    navigation.navigate(screenName);
  };

  return (
    <View>
      <Text>New User Register as</Text>
      <Button title="RESIDENT" onPress={() => handlePress('Resident')} />
      <Button title="VISITOR" onPress={() => handlePress('Visitor')} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 60,
  },
  header: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",

    paddingLeft: 10,
    paddingRight: 10,
  },
  headerText: {
    width: "100%",
    fontFamily: "PTMono-Regular",
    fontSize: 30,
    textAlign: "center",
  },
  topLeft: {
    position: "absolute",
    left: 10,
    top: 5,
    zIndex: 10,
  },
});

//export default SignUpScreen;