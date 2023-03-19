import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { auth, app } from "../../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, collection, addDoc,getDocFromCache,getDoc,setDoc,doc } from "firebase/firestore";
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
  Alert,
} from "react-native";
import Divider from "../components/Divider";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import { text } from "@fortawesome/fontawesome-svg-core";

const ResidentHome = () => {
  const loginWithGoogle = () => {};
  const register = () => {
         
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome!</Text>
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

export default ResidentHome;
