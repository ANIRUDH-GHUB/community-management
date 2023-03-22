import { auth, app, provider } from "../../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import Divider from "../components/Divider";
import InputBox from "../components/InputBox/InputBox";
import Container from "../components/Container/Container";
import common from "./../../constants/Styles";
import GoogleIcon from "./../../assets/icons/google.png";
import Button from "../components/Button/Button";
import { colors, errpr_messages, rolePath } from "../../constants/variables";
import { ROLES } from "../model/interfaces";

interface LoginProps {
  navigation: any;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const login = () => {
    setLoading(true);
    const db = getFirestore(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
        const user = userCredential.user;
        const roleRef = collection(db, "roles");
        const resDocRef = doc(roleRef, user.uid);
        getDoc(resDocRef)
          .then((doc) => {
            if (doc.exists()) {
              console.log("Document data:", doc.data());
              navigation.navigate(rolePath[doc.data().role as ROLES]);
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.code);
        setError(errpr_messages?.[err.code] || "Default Error");
        setLoading(false);
      });
  };

  const loginWithGoogle = () => {
    console.log("inside");
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("inside2");
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <Container style={common.container}>
      <InputBox placeholder="email" value={email} onChangeText={setEmail} />
      <Divider height={30} />
      <InputBox
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        type="password"
      />
      <Divider />
      <Text style={[common.text, common.sm, common.center, { color: "red" }]}>
        {error}
      </Text>
      <Divider height={40} />
      <Button onPress={login} loading={loading}>
        SIGN ME IN
      </Button>
      <Divider />
      <Text style={[common.text, common.center, common.sm]}>- OR -</Text>
      <Divider />
      <Button onPress={loginWithGoogle} bgColor={colors.white}>
        <Image source={GoogleIcon} style={styles.image} resizeMode="contain" />
        <Text
          style={[
            common.text,
            common.center,
            common.sm,
            { color: colors.background },
          ]}
        >
          SIGN IN WITH GOOGLE
        </Text>
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
    position: "absolute",
    top: 15,
    left: 20,
  },
});

export default Login;
