import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { auth, app } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import Divider from "../components/Divider";
import Header from "../components/Header";
import InputBox from "../components/InputBox/InputBox";
import { text } from "@fortawesome/fontawesome-svg-core";
import Container from "../components/Container/Container";
import common from "./../../constants/Styles";
import Button from "../components/Button/Button";
import { createUser } from "../services/UserService";
import { colors, roles } from "../../constants/variables";

const VisitorRegister = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cPassword, setCPassword] = useState<string>("");
  const [mobileNum, setMobileNum] = useState<string>("");

  const register = () => {
    createUser({ name, email, password, mobileNum }, roles.VISITOR);
  };

  return (
    <Container style={common.container}>
      <Divider height={50} />
      <InputBox placeholder="Name" value={name} onChangeText={setName} />
      <Divider height={30} />
      <InputBox placeholder="Email" value={email} onChangeText={setEmail} />
      <Divider height={30} />
      <InputBox
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        type="password"
      />
      <Divider height={30} />
      <InputBox
        placeholder="Confirm Password"
        value={cPassword}
        onChangeText={setCPassword}
        type="password"
      />
      <Divider height={30} />
      <InputBox
        placeholder="Mobile Number"
        value={mobileNum}
        onChangeText={setMobileNum}
      />
      <Divider height={30} />
      <Button onPress={register} bgColor={colors.fountainblue}>
        CREATE
      </Button>
      <Divider height={30} />
    </Container>
  );
};

export default VisitorRegister;