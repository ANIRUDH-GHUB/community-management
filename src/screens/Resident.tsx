import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { auth, app } from "../../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, collection, addDoc,getDocFromCache,getDoc,setDoc,doc } from "firebase/firestore";
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
  Alert,
} from "react-native";
import Divider from "../components/Divider";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import { text } from "@fortawesome/fontawesome-svg-core";

const Resident = () => {
  const [name, setName] = useState<string>("");
  const [dOB, setDOB] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobileNum, setMobileNum] = useState<string>("");
  const [noOfResidents, setNoOfResidents] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [hobby, setHobby] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [degree, setDegree] = useState<string>("");

  const loginWithGoogle = () => {};
  const register = () => {
    const db = getFirestore(app);

    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response);
        const uid = response.user.uid;
        const data = {
          name: name,
          dob: dOB,
          mobile_num: mobileNum,
          no_of_residents: noOfResidents,
          unit: unit,
          genre: genre,
          hobby: hobby,
          degree: degree,
        };
        const roleRef = collection(db, "roles");
        const resRef = collection(db, "residents");
        const roleData = {
          role: "resident",
        };
      
        const resDocRef = doc(resRef, uid);
        setDoc(resDocRef, data)
          .then(() => {
            console.log("Document has been added successfully with custom ID:", uid);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        
          const roleDocRef = doc(roleRef, uid);
          setDoc(roleDocRef, roleData)
            .then(() => {
              console.log("Document has been added successfully with custom ID:", uid);
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
  });
}

  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome!</Text>
      <Divider height={50} />
      <InputBox placeholder="Name" value={name} onChangeText={setName} />
      <Divider height={30} />
      <InputBox
        placeholder="DOB(MM/DD/YYYY)"
        value={dOB}
        onChangeText={setDOB}
      />
      <Divider height={30} />
      <InputBox placeholder="Email" value={email} onChangeText={setEmail} />
      <Divider height={30} />
      <InputBox
        placeholder="Mobile Number"
        value={mobileNum}
        onChangeText={setMobileNum}
      />
      <Divider height={30} />
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
      <InputBox placeholder="Hobbies" value={hobby} onChangeText={setHobby} />
      <Divider height={30} />
      <InputBox
        placeholder="Higgest Degree"
        value={degree}
        onChangeText={setDegree}
      />
      <Divider height={30} />
      <InputBox
        placeholder="Your password"
        value={password}
        onChangeText={setPassword}
      />
      <Divider height={30} />

      <Divider height={50} />
      <Button title="SUBMIT" onPress={register} />
    </SafeAreaView>
  );
};

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

export default Resident;
