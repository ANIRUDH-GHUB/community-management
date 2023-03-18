import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { auth, app } from "../../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
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
  Alert
} from "react-native";
import Divider from "../components/Divider";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import { text } from "@fortawesome/fontawesome-svg-core";


const Visitor = () => {
  const [vehicleLicense, setVehicleLicense] = useState<string>("");
  const [carMake, setCarMake] = useState<string>("");
  const [carModel, setCarModel] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [stateRegistered, setStateRegistered] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  
  const loginWithGoogle = () => {
    
    console.log(vehicleLicense)
  };
  const register = () => {
    
    console.log("button presed")
    const db = getFirestore(app);
    const dbRef = collection(db, "visitors");
    const data = {
      license_plate_number:vehicleLicense,
      car_make: carMake,
      car_model: carModel,
      state_registered:stateRegistered,
      unit:unit,
      year:year
    };
    addDoc(dbRef, data)
      .then(docRef => {
        console.log("Document has been added successfully");
      })
      .catch(error => {
        console.log(error);
      })

  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome!</Text>
      <Divider height={50} />
      <InputBox placeholder="Vehicle License Plate"  value={vehicleLicense} onChangeText={setVehicleLicense} />
      <Divider height={30} />
      <InputBox placeholder="Car make" value={carMake} onChangeText={setCarMake} />
      <Divider height={30} />
      <InputBox placeholder="Car model" value={carModel} onChangeText={setCarModel}  />
      <Divider height={30} />
      <InputBox placeholder="Year" value={year} onChangeText={setYear}  />
      <Divider height={30} />
      <InputBox placeholder="State of registration" value={stateRegistered} onChangeText={setStateRegistered}  />
      <Divider height={30} />
      <InputBox placeholder="UNIT"  value={unit} onChangeText={setUnit} />
      <Divider height={50} />
      <Button
        title="Register now"
        onPress={register}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 60,
  },
});

export default Visitor;
