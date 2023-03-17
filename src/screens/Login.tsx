import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Divider from "../components/Divider";
import Header from "../components/Header";
import InputBox from "../components/InputBox";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const loginWithGoogle = () => {
    setError(!error);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Login" goBack={loginWithGoogle} />
      <Divider height={50}/>
      <InputBox placeholder="email" value={email} onChangeText={setEmail} />
      <Divider height={30}/>
      <InputBox placeholder="password" value={password} onChangeText={setPassword} type="password"/>
    </SafeAreaView>
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

export default Login;
