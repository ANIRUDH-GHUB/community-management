import {
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Image,
  StyleSheet,
  ScrollView
} from "react-native";
import Container from "../../components/Container/Container";
import React, { useState, useEffect } from "react";
import { fetchUserDetails } from "../../services/UserService";
import { RESIDENT_USER } from "../../model/interfaces";
import styles from "./styles";
import common from "./../../../constants/Styles";
import Header from "../../components/Header/Header";
import ProfileIcon from "./../../../assets/icons/profile-male.png";
import HomeImage from "./../../../assets/icons/home2.png";
import InputBox from "../../components/InputBox/InputBox";
import { colors } from "../../../constants/variables";

const Profile = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cPassword, setCPassword] = useState<string>("");
  const [mobileNum, setMobileNum] = useState<string>("");
  const [dob, setDOB] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [noOfResidents, setNoOfResidents] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [hobby, setHobby] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    const res = fetchUserDetails();
    setName(res.name);
    setEmail(res.email);
    setPassword(res.password);
    setMobileNum(res.mobileNum);
    setDOB(res.dob);
    setNoOfResidents(res.noOfResidents);
    setGenre(res.genre);
    setHobby(res.hobby);
    setDegree(res.degree);
    setUnit(res.unit);
  }, []);
  const saveUserDetails = async () => {
    setEditMode(false);
  };

  const ProfileDetails = () => {
    return (
      <Container style={common.container}>
        <Header title="Profile" />
       <ScrollView>
       <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Image
            source={ProfileIcon}
            style={style.profileImage}
            resizeMode="contain"
          />
          <Text style={[common.text, common.center, common.md, common.capital]}>
            {name}
          </Text>
          <Text style={[common.text, common.center, common.sm, common.light]}>
            {email}
          </Text>
        </View>
        <View style={{marginTop: 30}}>
          <InputBox
            placeholder="DOB"
            value={dob}
            onChangeText={setDOB}
            customStyle={{
              marginTop: 6,
              marginBottom: 6,
              backgroundColor: colors.policeBlue,
            }}
            editable={false}
          />
          <InputBox
            placeholder="DOB"
            value={mobileNum}
            onChangeText={setMobileNum}
            customStyle={{
              marginTop: 6,
              marginBottom: 6,
              backgroundColor: colors.policeBlue,
            }}
            editable={false}
          />
          <InputBox
            placeholder="DOB"
            value={degree}
            onChangeText={setGenre}
            customStyle={{
              marginTop: 6,
              marginBottom: 6,
              backgroundColor: colors.policeBlue,
            }}
            editable={false}
          />
          <InputBox
            placeholder="DOB"
            value={unit}
            onChangeText={setUnit}
            customStyle={{
              marginTop: 6,
              marginBottom: 6,
              backgroundColor: colors.policeBlue,
            }}
            editable={false}
          />
          <InputBox
            placeholder="DOB"
            value={noOfResidents}
            onChangeText={setNoOfResidents}
            customStyle={{
              marginTop: 6,
              marginBottom: 6,
              backgroundColor: colors.policeBlue,
            }}
            editable={false}
          />
          <InputBox
            placeholder="DOB"
            value={noOfResidents}
            onChangeText={setNoOfResidents}
            customStyle={{
              marginTop: 6,
              marginBottom: 6,
              backgroundColor: colors.policeBlue,
            }}
            editable={false}
          />
          <InputBox
            placeholder="DOB"
            value={noOfResidents}
            onChangeText={setNoOfResidents}
            customStyle={{
              marginTop: 6,
              marginBottom: 6,
              backgroundColor: colors.policeBlue,
            }}
            editable={false}
          />
        </View>
       </ScrollView>
      </Container>
    );
  };

  return (
      <ProfileDetails />
  );
};

const style = StyleSheet.create({
  profileImage: {
    height: 60,
    width: 60,
    marginTop: 15,
    marginBottom: 15,
  },
});

export default Profile;
