import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colors, error_messages, rolePath } from "../../constants/variables";
import { auth, provider } from "../../firebase";
import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import Divider from "../components/Divider";
import InputBox from "../components/InputBox/InputBox";
import { ROLES } from "../model/interfaces";
import { loginUser } from "../services/UserService";
import GoogleIcon from "./../../assets/icons/google.png";
import common from "./../../constants/Styles";
import { setUser } from "../state/slice/userSlice";

interface LoginProps {
  navigation: any;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();

  const login = async () => {
    setLoading(true);
    const res = await loginUser({ email, password });
    setLoading(false);
    if (res?.success) {
      dispatch(setUser(res?.data));
      navigation.navigate(rolePath[res.data.role as ROLES]);
    } else {
      setError(error_messages[res?.err?.code] || "Error while Login");
    }
  };

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log(user);
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
    <Container>
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
      <Divider height={40} />
      <Pressable
        onPress={() => {
          navigation.navigate("Forgot");
        }}
      >
        <Text style={[common.text, common.center, common.sm, common.underline]}>
          Forgot Password?
        </Text>
      </Pressable>
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
