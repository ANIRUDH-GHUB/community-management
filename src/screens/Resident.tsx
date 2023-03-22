import React, { useState } from "react";

import { Text } from "react-native";
import Container from "../components/Container/Container";
import Divider from "../components/Divider";
import InputBox from "../components/InputBox/InputBox";
import { createUser } from "../services/UserService";
import Button from "../components/Button/Button";

import common from "./../../constants/Styles";
import { colors, roles } from "../../constants/variables";

const Resident = () => {
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

  const register = () => {
    createUser(
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
  };

  return (
    <Container>
      <Divider height={50} />
      <InputBox placeholder="Name" value={name} onChangeText={setName} />
      <Divider height={30} />
      <InputBox placeholder="Email" value={email} onChangeText={setEmail} />
      <Divider height={30} />
      <InputBox
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        type="password"
      />
      <Divider height={30} />
      <InputBox
        placeholder="Confirm Password"
        value={cPassword}
        onChangeText={setCPassword}
        type="password"
      />
      <Divider height={30} />
      <InputBox
        placeholder="Mobile Number"
        value={mobileNum}
        onChangeText={setMobileNum}
      />
      <Divider height={30} />

      <InputBox
        placeholder="DOB(MM/DD/YYYY)"
        value={dob}
        onChangeText={setDOB}
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
      <Button onPress={register} bgColor={colors.fountainblue}>
        CREATE
      </Button>
      <Divider height={30} />
    </Container>
  );
};

export default Resident;
