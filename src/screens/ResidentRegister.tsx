import React, { useState, useMemo } from "react";
import Container from "../components/Container/Container";
import Divider from "../components/Divider";
import InputBox from "../components/InputBox/InputBox";
import { createUser } from "../services/UserService";
import Button from "../components/Button/Button";
import { colors, roles } from "../../constants/variables";
import { useDispatch } from "react-redux";
import { setUser } from "../state/slice/userSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View } from "react-native";

const ResidentRegister = ({ navigation }: any) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cPassword, setCPassword] = useState<string>("");
  const [mobileNum, setMobileNum] = useState<string>("");
  const [dob, setDOB] = useState(new Date());
  const [unit, setUnit] = useState<string>("");
  const [noOfResidents, setNoOfResidents] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [hobby, setHobby] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [error, setError] = useState({
    email: "",
    pStrength: "",
    pMatch: "",
  });
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const strengthRegex =
    /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/;

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
  const isValid = useMemo<boolean>(
    () =>
      !!(
        name &&
        email &&
        password &&
        mobileNum &&
        noOfResidents &&
        unit &&
        !(error.email || error.pStrength || error.pMatch)
      ),
    [name, email, password, cPassword, mobileNum, noOfResidents, unit]
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

  const onDateUpdate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || dob;
    setDOB(currentDate);
    setShowDate(false)
  };

  const register = async () => {
    if (isValid) {
      setLoading(true);
      const res = await createUser(
        {
          name,
          dob,
          email,
          mobileNum,
          noOfResidents,
          unit,
          genre,
          hobby,
          degree,
          password,
        },
        roles.RESIDENT
      );
      setLoading(false);
      if (res) {
        dispatch(setUser(res?.data));
        navigation.navigate("ResidentLanding");
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
        keyboardType="number-pad"
      />
      <Divider height={30} />

      <InputBox
        placeholder="DOB(MM/DD/YYYY)"
        value={dob.toLocaleString().split(",")[0] || ""}
        onPress={() => setShowDate(true)}
      />
      <Divider height={30} />
      <InputBox
        placeholder="Number of Residents"
        value={noOfResidents}
        onChangeText={setNoOfResidents}
        keyboardType="number-pad"
      />
      <Divider height={30} />
      <InputBox placeholder="UNIT" value={unit} onChangeText={setUnit} />
      <Divider height={30} />
      <InputBox
        placeholder="Movie Geners"
        value={genre}
        onChangeText={setGenre}
      />
      <Divider height={30} />
      <InputBox placeholder="Hobbies" value={hobby} onChangeText={setHobby} />
      <Divider height={30} />
      <InputBox
        placeholder="Higgest Degree"
        value={degree}
        onChangeText={setDegree}
      />
      <Divider height={30} />
      <Divider height={30} />
      <Button
        onPress={register}
        bgColor={colors.fountainblue}
        loading={loading}
        disabled={!isValid}
      >
        CREATE
      </Button>
      <Divider height={30} />
      <View>
        {showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dob}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={onDateUpdate}
          />
        )}
      </View>
    </Container>
  );
};

export default ResidentRegister;
