import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../constants/variables";
import Alert from "../../components/Alert/Alert";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import InputBox from "../../components/InputBox/InputBox";
import { fetchUserDetails, logoutUser } from "../../services/UserService";
import ProfileIcon from "./../../../assets/icons/profile-male.png";
import common from "./../../../constants/Styles";

const Profile = ({ navigation }: any) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobileNum, setMobileNum] = useState<string>("");
  const [dob, setDOB] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [noOfResidents, setNoOfResidents] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [editMode, setEditMode] = useState(false);
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await fetchUserDetails();
      console.log(res)
      setName(res.name);
      setEmail(res.email);
      setMobileNum(res.mobile_num);
      setDOB(res.dob);
      setNoOfResidents(res.no_of_residents);
      setDegree(res.degree);
      setUnit(res.unit);
    })();
  }, []);

  const logoutHandler = () => {
    navigation.navigate("Home");
    logoutUser();
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
            <Text
              style={[common.text, common.center, common.md, common.capital]}
            >
              {name}
            </Text>
            <Text style={[common.text, common.center, common.sm, common.light]}>
              {email}
            </Text>
          </View>
          <View style={{ marginTop: 30 }}>
            <InputBox
              placeholder="DOB"
              value={"DOB: "+dob}
              onChangeText={setDOB}
              customStyle={{
                marginTop: 6,
                marginBottom: 6,
                backgroundColor: colors.policeBlue,
              }}
              editable={false}
            />
            <InputBox
              placeholder="Phone"
              value={"Phone: "+mobileNum}
              onChangeText={setMobileNum}
              customStyle={{
                marginTop: 6,
                marginBottom: 6,
                backgroundColor: colors.policeBlue,
              }}
              editable={false}
            />

            <InputBox
              placeholder="Unit"
              value={"Unit: "+unit}
              onChangeText={setUnit}
              customStyle={{
                marginTop: 6,
                marginBottom: 6,
                backgroundColor: colors.policeBlue,
              }}
              editable={false}
            />
            <InputBox
              placeholder="Number of Residents"
              value={"Residents: "+noOfResidents}
              onChangeText={setNoOfResidents}
              customStyle={{
                marginTop: 6,
                marginBottom: 6,
                backgroundColor: colors.policeBlue,
              }}
              editable={false}
            />
          </View>
          <Button onPress={() => setConfirm(true)} bgColor={colors.peach}>
            Logout
          </Button>
        </ScrollView>
        <Alert
          show={confirm}
          onClose={() => setConfirm(false)}
          onConfirm={() => logoutHandler()}
        ></Alert>
      </Container>
    );
  };

  return <ProfileDetails />;
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
