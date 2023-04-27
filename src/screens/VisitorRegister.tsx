import React, { useState, useMemo } from "react";
import Divider from "../components/Divider";
import InputBox from "../components/InputBox/InputBox";
import Container from "../components/Container/Container";
import common from "./../../constants/Styles";
import Button from "../components/Button/Button";
import { createUser } from "../services/UserService";
import { colors, roles } from "../../constants/variables";
import { useDispatch } from "react-redux";
import { setUser } from "../state/slice/userSlice";

const VisitorRegister = ({ navigation }: any) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cPassword, setCPassword] = useState<string>("");
  const [mobileNum, setMobileNum] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    email: "",
    pStrength: "",
    pMatch: "",
    phone: "",
  });
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const strengthRegex =
    /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/;
  const phoneRegex = /^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/;

  const dispatch = useDispatch();

  const validateEmail = () => {
    if (email && !emailRegex.test(email))
      setError((error) => ({ ...error, email: "Invalid email address" }));
    else setError((error) => ({ ...error, email: "" }));
  };

  const validatePasswordStrength = () => {
    if (password && !strengthRegex.test(password))
      setError((error) => ({ ...error, pStrength: "Weak Password" }));
    else setError((error) => ({ ...error, pStrength: "" }));
    if (cPassword && cPassword !== password)
      setError((error) => ({ ...error, pMatch: "Passwords do not match" }));
    else setError((error) => ({ ...error, pMatch: "" }));
  };

  const validatePhone = () => {
    if (mobileNum && !phoneRegex.test(mobileNum))
      setError((error) => ({ ...error, phone: "Invalid Phone" }));
    else setError((error) => ({ ...error, phone: "" }));
  };

  const isValid = useMemo<boolean>(
    () =>
      !!(
        name &&
        email &&
        password &&
        mobileNum &&
        !(error.email || error.pStrength || error.pMatch || error.phone)
      ),
    [name, email, password, cPassword, mobileNum]
  );

  const formatPhoneNumber = (text: string) => {
    let formattedNumber = "";
    let nums = 0;
    text.split("").forEach((item) => {
      if (/\d+/g.test(item)) nums += 1;
    });
    const length = nums;
    console.log(length, text);
    // Filter non numbers
    const regex = () => text.replace(/[^0-9\.]+/g, "");
    // Set area code with parenthesis around it
    const areaCode = () => `(${regex().slice(0, 3)})`;
    // Dynamic trail as user types
    const trailer = (start: number, end: number) =>
      `${regex().slice(start, end)}`;

    if (length <= 3) {
      // First 3 digits
      formattedNumber = regex();
    } else if (length <= 6) {
      // After area code
      formattedNumber = `${areaCode()} ${trailer(3, 6)}`;
    } else if (length <= 11) {
      // After area code
      formattedNumber = `${areaCode()} ${trailer(3, 6)}-${trailer(6, 10)}`;
    }
    return formattedNumber;
  };

  const register = async () => {
    if (isValid) {
      setLoading(true);
      const res = await createUser(
        { name, email, password, mobileNum },
        roles.VISITOR
      );
      setLoading(false);
      if (res) {
        dispatch(setUser(res?.data));
        navigation.navigate("VisitorLanding");
      }
    }
  };

  return (
    <Container>
      <Divider height={50} />
      <InputBox placeholder="Name" value={name} onChangeText={setName} />
      <Divider height={30} />
      <InputBox
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        error={error?.email}
        onRelease={validateEmail}
        keyboardType="email-address"
      />
      <Divider height={30} />
      <InputBox
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        onRelease={validatePasswordStrength}
        type="password"
        error={error?.pStrength}
      />
      <Divider height={30} />
      <InputBox
        placeholder="Confirm Password"
        value={cPassword}
        onChangeText={setCPassword}
        onRelease={validatePasswordStrength}
        type="password"
        error={error?.pMatch}
      />
      <Divider height={30} />
      <InputBox
        placeholder="Mobile Number"
        value={mobileNum}
        onChangeText={(text) => setMobileNum(formatPhoneNumber(text))}
        onRelease={validatePhone}
        error={error.phone}
        keyboardType="number-pad"
      />
      <Divider height={30} />
      <Button
        onPress={register}
        bgColor={colors.fountainblue}
        loading={loading}
      >
        CREATE
      </Button>
      <Divider height={30} />
    </Container>
  );
};

export default VisitorRegister;
