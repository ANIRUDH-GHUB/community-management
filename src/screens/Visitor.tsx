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
  Button,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import Divider from "../components/Divider";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import { text } from "@fortawesome/fontawesome-svg-core";

const Visitor = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mobileNum,setMobileNum] = useState<string>("");

  const register = () => {
    const db = getFirestore(app);

    createUserWithEmailAndPassword(auth, email, password).then((response) => {
      console.log(response);
      const uid = response.user.uid;
      const data = {
        name: name,
        mobile_num: mobileNum,
      };
      const roleRef = collection(db, "roles");
      const visRef = collection(db, "visitors");
      const roleData = {
        role: "visitor",
      };
    
      const visDocRef = doc(visRef, uid);
      setDoc(visDocRef, data)
        .then(() => {
          console.log("Document has been added successfully with custom ID:", uid);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      
        const roleDocRef = doc(roleRef, uid);
        setDoc(roleDocRef, roleData)
          .then(() => {
            console.log("Document has been added successfully with custom ID:", uid);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome!</Text>
      <Divider height={50} />
      <InputBox placeholder="Name" value={name} onChangeText={setName} />
      <Divider height={30} />
      <InputBox placeholder="Email" value={email} onChangeText={setEmail} />
      <Divider height={30} />
      <InputBox
        placeholder="Your password"
        value={password}
        onChangeText={setPassword}
      />
      <Divider height={30} />
      <InputBox placeholder="Mobile Number" value={mobileNum} onChangeText={setMobileNum} />
      <Divider height={50} />
      <Button title="SUBMIT" onPress={register} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 60,
  },
});

export default Visitor;
