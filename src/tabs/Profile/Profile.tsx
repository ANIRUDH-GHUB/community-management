import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, roles } from "../../../constants/variables";
import Alert from "../../components/Alert/Alert";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import InputBox from "../../components/InputBox/InputBox";
import { fetchUserDetails, logoutUser } from "../../services/UserService";
import ProfileIcon from "./../../../assets/icons/profile-male.png";
import common from "./../../../constants/Styles";
import UserEdit from "../Admin/UserEditPopup";

const Profile = ({ navigation }: any) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mobileNum, setMobileNum] = useState<string>("");
  const [dob, setDOB] = useState<string>("");
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
  const [confirm, setConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [refresh, setRefresh] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetchUserDetails();
      console.log(res);
      setSelectedUser(res);
      setName(res?.name);
      setEmail(res?.email);
      setMobileNum(res?.mobile_num || "");
      setDOB(res?.dob || "");
      setUnit(res?.unit || "");
      setNoOfResidents(res?.no_of_residents || "");
      setGenre(res?.genre || "");
      setHobby(res?.hobby || "");
      setDegree(res?.degree || "");
      setCarModel(res?.carModel || "");
      setCarType(res?.carType || "");
      setLicenceNum(res?.licenceNum || "");
      setUID(res?.uid);
      setRole(res?.role);
    })();
    setRefresh(false);
  }, [refresh]);

  const logoutHandler = () => {
    navigation.navigate("Home");
    logoutUser();
  };

  const ProfileDetails = () => {
    return (
      <Container >
        <Header title="Profile" />
        {showForm ? (
          <UserEdit
            user={selectedUser}
            onCancel={() => {
              setShowForm(false);
            }}
            onChange={() => {
              setShowForm(false);
              setRefresh(true);
            }}
          />
        ) : (
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
              <Text
                style={[common.text, common.center, common.sm, common.light]}
              >
                {email}
              </Text>
            </View>
            {role === roles.RESIDENT && (
              <View style={{ marginTop: 30 }}>
                <InputBox
                  placeholder="DOB"
                  value={"DOB: " + dob}
                  onChangeText={setDOB}
                  customStyle={style.boxStyle}
                  editable={false}
                />
                <InputBox
                  placeholder="Phone"
                  value={"Phone: " + mobileNum}
                  onChangeText={setMobileNum}
                  customStyle={style.boxStyle}
                  editable={false}
                />

                <InputBox
                  placeholder="Unit"
                  value={"Unit: " + unit}
                  onChangeText={setUnit}
                  customStyle={style.boxStyle}
                  editable={false}
                />
                <InputBox
                  placeholder="Number of Residents"
                  value={"Residents: " + noOfResidents}
                  onChangeText={setNoOfResidents}
                  customStyle={style.boxStyle}
                  editable={false}
                />
              </View>
            )}
            {role === roles.VISITOR && (
              <View style={{ marginTop: 30 }}>
                <InputBox
                  placeholder="Phone"
                  value={"Phone: " + mobileNum}
                  onChangeText={setMobileNum}
                  customStyle={style.boxStyle}
                  editable={false}
                />

                <InputBox
                  placeholder="Car Type"
                  value={"Car Type: " + carType}
                  onChangeText={setCarType}
                  customStyle={style.boxStyle}
                  editable={false}
                />
                <InputBox
                  placeholder="Car Model"
                  value={"Model: " + carModel}
                  onChangeText={setCarModel}
                  customStyle={style.boxStyle}
                  editable={false}
                />
                <InputBox
                  placeholder="Licence"
                  value={"Licence: " + licenceNum}
                  onChangeText={setLicenceNum}
                  customStyle={style.boxStyle}
                  editable={false}
                />
              </View>
            )}

            <Button
              onPress={() => setShowForm(true)}
              bgColor={colors.slategray}
            >
              Edit
            </Button>
            <Button onPress={() => setConfirm(true)} bgColor={colors.peach}>
              Logout
            </Button>
          </ScrollView>
        )}
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
  boxStyle: {
    marginTop: 6,
    marginBottom: 6,
    backgroundColor: colors.policeBlue,
  },
});

export default Profile;
