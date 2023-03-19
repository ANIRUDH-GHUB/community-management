import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { auth, app } from "../../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc,getDoc ,doc} from "firebase/firestore";
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
import { userInfo } from "os";

interface LoginProps {
  navigation: any;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const login = () => {
    const db = getFirestore(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        console.log(userCredential)
        const user = userCredential.user;
        const roleRef = collection(db, "roles");
    
        
        const resDocRef = doc(roleRef, user.uid);
        getDoc(resDocRef)
        .then((doc) => {
          if (doc.exists()) {
            console.log("Document data:", doc.data());
            navigation.navigate(doc.data().role+"Home");
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome!</Text>
      <Divider height={50} />
      <InputBox placeholder="email" value={email} onChangeText={setEmail} />
      <Divider height={30} />
      <InputBox placeholder="password" value={password} onChangeText={setPassword} type="password" />
      <Divider height={50} />
      <Divider height={50} />
      <Button title="Sign me in" onPress={login} />
    </SafeAreaView>
  );
}

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
