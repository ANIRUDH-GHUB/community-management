import { Text, TouchableOpacity, TextInput } from "react-native";
import Container from "../../components/Container/Container";
import React, { useState, useEffect } from "react";
import { fetchUserDetails } from "../../services/UserService";
import { RESIDENT_USER } from "../../model/interfaces";
import styles from "./styles";

const Profile = () => {
  const [userDetails, setUserDetails] = useState<RESIDENT_USER>({
    email: "",
    name: "",
    password: "",
  });
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    setUserDetails(fetchUserDetails());
  }, []);
  const saveUserDetails = async () => {
    setEditMode(false);
  };

  const ProfileDetails = () => {
    return (
      <Container style={styles.bgcolor}>
        <Text>Name: {userDetails?.name}</Text>
        <Text>Email: {userDetails?.email}</Text>
        <Text>Phone: {userDetails?.mobileNum}</Text>
        <Text>DOB: {userDetails?.dob}</Text>
        <Text>password: {userDetails?.password}</Text>
        <Text>unit: {userDetails?.unit}</Text>
        <Text>genre: {userDetails?.genre}</Text>
        <Text>hobby: {userDetails?.hobby}</Text>
        <Text>degree: {userDetails?.degree}</Text>
        <TouchableOpacity onPress={() => setEditMode(true)}>
          <Text>Edit</Text>
        </TouchableOpacity>
      </Container>
    );
  };

  const EditForm = () => {
    return (
      <Container style={styles.bgcolor}>
        <TextInput
          value={userDetails?.name}
          onChangeText={(text) =>
            setUserDetails({ ...userDetails, name: text })
          }
        />
        <TextInput
          value={userDetails?.email}
          onChangeText={(text) =>
            setUserDetails({ ...userDetails, email: text })
          }
        />
        <TextInput
          value={userDetails?.mobileNum}
          onChangeText={(text) =>
            setUserDetails({ ...userDetails, mobileNum: text })
          }
        />
        <TextInput
          value={userDetails?.dob}
          onChangeText={(text) => setUserDetails({ ...userDetails, dob: text })}
        />
        <TextInput
          value={userDetails?.password}
          onChangeText={(text) =>
            setUserDetails({ ...userDetails, password: text })
          }
        />
        <TextInput
          value={userDetails?.unit}
          onChangeText={(text) =>
            setUserDetails({ ...userDetails, unit: text })
          }
        />
        <TextInput
          value={userDetails?.genre}
          onChangeText={(text) =>
            setUserDetails({ ...userDetails, genre: text })
          }
        />
        <TextInput
          value={userDetails?.hobby}
          onChangeText={(text) =>
            setUserDetails({ ...userDetails, hobby: text })
          }
        />
        <TextInput
          value={userDetails?.degree}
          onChangeText={(text) =>
            setUserDetails({ ...userDetails, degree: text })
          }
        />
        <TouchableOpacity onPress={() => saveUserDetails()}>
          <Text>Save</Text>
        </TouchableOpacity>
      </Container>
    );
  };

  return (
    <Container style={styles.bgcolor}>
      {editMode ? <EditForm /> : <ProfileDetails />}
    </Container>
  );
};

export default Profile;
