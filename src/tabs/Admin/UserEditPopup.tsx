import React, { useState, useEffect } from "react";
import Container from "./../../components/Container/Container";
import Divider from "./../../components/Divider";
import InputBox from "./../../components/InputBox/InputBox";
import { updateUser } from "./../../services/UserService";
import Button from "./../../components/Button/Button";

import { colors } from "./../../../constants/variables";
import { useDispatch } from "react-redux";
import { setUser } from "./../../state/slice/userSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View } from "react-native";

const UserEdit = ({ user, onCancel, onChange }: any) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mobileNum, setMobileNum] = useState<string>("");
  const [dob, setDOB] = useState<any>("");
  const [unit, setUnit] = useState<string>("");
  const [noOfResidents, setNoOfResidents] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [hobby, setHobby] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [carModel, setCarModel] = useState<string>("");
  const [carType, setCarType] = useState<string>("");
  const [licenceNum, setLicenceNum] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [uid, setUID] = useState("");
  const [role, setRole] = useState("resident");
  const [showDate, setShowDate] = useState(false);
  const dispatch = useDispatch();

  const onDateUpdate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || dob;
    setDOB(currentDate);
    setShowDate(false);
  };

  const update = async () => {
    setLoading(true);
    const res = await updateUser({
      uid,
      name,
      email,
      password,
      mobileNum,
      dob,
      unit,
      noOfResidents,
      genre,
      hobby,
      degree,
      carModel,
      carType,
      licenceNum,
    });
    setLoading(false);
    onChange();
    if (res) {
      dispatch(setUser(res?.data));
    }
  };

  useEffect(() => {
    if (user) {
      console.log(user);
      setName(user?.name);
      setEmail(user?.email);
      setMobileNum(user?.mobile_num || "");
      // console.log(user?.dob)
      // setDOB(new Date(user?.dob || 0));
      setDOB(user?.dob);
      setUnit(user?.unit || "");
      setNoOfResidents(user?.no_of_residents || "");
      setGenre(user?.genre || "");
      setHobby(user?.hobby || "");
      setDegree(user?.degree || "");
      setCarModel(user?.carModel || "");
      setCarType(user?.carType || "");
      setLicenceNum(user?.licenceNum || "");
      setUID(user?.uid);
      setRole(user?.role);
    }
  }, [user]);
  return (
    <Container>
      {/* <View>
        {console.log(showDate)}
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
      </View> */}
      <Divider height={50} />
      <InputBox placeholder="Name" value={name} onChangeText={setName} />
      <Divider height={30} />
      {/* <InputBox placeholder="Email" value={email} onChangeText={setEmail} />
      <Divider height={30} /> */}
      <InputBox
        placeholder="Mobile Number"
        value={mobileNum}
        onChangeText={setMobileNum}
      />
      <Divider height={30} />
      <InputBox
        placeholder="DOB(MM/DD/YYYY)"
        value={dob.toLocaleString().split(",")[0] || ""}
        onPress={() => setShowDate(true)}
        onChangeText={setDOB}
      />
      <Divider height={30} />
      <View>
        {role === "resident" && (
          <View>
            <InputBox
              placeholder="Number of Residents"
              value={noOfResidents}
              onChangeText={setNoOfResidents}
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
            <InputBox
              placeholder="Hobbies"
              value={hobby}
              onChangeText={setHobby}
            />
            <Divider height={30} />
            <InputBox
              placeholder="Higgest Degree"
              value={degree}
              onChangeText={setDegree}
            />
          </View>
        )}
      </View>
      <View>
        {role === "visitor" && (
          <View>
            <InputBox
              placeholder="Car Type"
              value={carType}
              onChangeText={setCarType}
            />
            <Divider height={30} />
            <InputBox
              placeholder="Car Model"
              value={carModel}
              onChangeText={setCarModel}
            />
            <Divider height={30} />
            <InputBox
              placeholder="Licence Number"
              value={licenceNum}
              onChangeText={setLicenceNum}
            />
          </View>
        )}
      </View>
      <Divider height={30} />
      <Divider height={30} />
      <Button onPress={update} bgColor={colors.fountainblue} loading={loading}>
        UPDATE
      </Button>
      <Divider height={30} />
      <Button
        onPress={onCancel}
        bgColor={colors.elevatedBackground}
        loading={loading}
      >
        CANCEL
      </Button>
    </Container>
  );
};

export default UserEdit;
