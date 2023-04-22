import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { Image, StyleSheet, Text, Pressable, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colors, error_messages, rolePath } from "../../constants/variables";
import { auth, provider } from "../../firebase";
import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import Divider from "../components/Divider";
import InputBox from "../components/InputBox/InputBox";
import { ROLES } from "../model/interfaces";
import { reset } from "../services/UserService";
import GoogleIcon from "./../../assets/icons/google.png";
import common from "./../../constants/Styles";
import { setUser } from "../state/slice/userSlice";

interface LoginProps {
  navigation: any;
}

const ForgotPassword: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccss] = useState<boolean>(false);

  const resetPassword = async () => {
    setLoading(true);
    const res = await reset(email);
    setLoading(false);
    if (res?.success) {
      setSuccss(true);
      setError('');
    } else {
      console.log(res);
      setError(error_messages[res?.err?.code] || "Error while Login");
    }
  };

  return (
    <Container style={common.container}>
      <InputBox placeholder="email" value={email} onChangeText={setEmail} />
      <Divider height={30} />
      <View>
        {success && (
          <Text
            style={[common.text, common.sm, common.center, { padding: 10 }]}
          >
            A password reset email has been sent to your registered email
            address. Please check your inbox and follow the instructions in the
            email to reset your password
          </Text>
        )}
      </View>
      <View>
        {error && (
          <Text
            style={[common.text, common.sm, common.center, { color: "red" }]}
          >
            {error}
          </Text>
        )}
      </View>
      <Divider height={40} />
      <Button onPress={resetPassword} bgColor={colors.white} loading={loading}>
        {/* <Image source={GoogleIcon} style={styles.image} resizeMode="contain" /> */}
        <Text
          style={[
            common.text,
            common.center,
            common.sm,
            { color: colors.background },
          ]}
        >
          SUBMIT
        </Text>
      </Button>
      <Divider height={40} />
      <Pressable
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={[common.text, common.center, common.sm, common.underline]}>
          Back to Login?
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

export default ForgotPassword;
