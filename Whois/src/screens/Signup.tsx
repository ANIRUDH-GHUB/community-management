import React from "react";

import { StyleSheet, Text, View, Image } from "react-native";
import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import Divider from "../components/Divider";
import common from "./../../constants/Styles";
import HomeImage from "./../../assets/icons/home2.png";
import { colors } from "../../constants/variables";

interface SignupProps {
  navigation: any;
}

const SignUpScreen: React.FC<SignupProps> = ({ navigation }) => {
  const handlePress = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <Container style={common.container}>
      <Image source={HomeImage} style={styles.image} resizeMode="contain" />
      <Text style={[common.text, common.center, common.md]}>New User Register as</Text>
      <Divider height={20}/>
      <Button onPress={() => handlePress("Resident")} bgColor={colors.peach}>RESIDENT</Button>
      <Divider height={10}/>
      <Button onPress={() => handlePress("Visitor")}>VISITOR</Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 400,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 40,
    borderRadius: 20,
  },
});

export default SignUpScreen;
