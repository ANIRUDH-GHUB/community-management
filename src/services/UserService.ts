import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { fetchCollectionData, fetchDocData, pushDataToDoc } from ".";
import userJSON from "../../assets/json/user.json";
import { auth } from "../../firebase";
import { USER } from "../model/interfaces";
import * as Keychain from "react-native-keychain";
import { getStoreData, removeStoreData, setStoreData } from "./StorageService";

/**
 * This functionn creates user based on role
 * @param user USER DETAILS
 * @param role USER ROLE
 *
 */
export const createUser = async (user: USER, role: string) => {
  const res = { data: "" as any, success: false, err: "" };
  await createUserWithEmailAndPassword(auth, user?.email, user?.password)
    .then(async (response) => {
      console.log(response);
      res.success = true;
      res.data = "Success";
      const uid = response.user.uid;
      const data = {
        name: user?.name || "",
        email: user?.email || "",
        dob: user?.dob || "",
        mobile_num: user?.mobileNum || "",
        no_of_residents: user?.noOfResidents || "",
        unit: user?.unit || "",
        genre: user?.genre || "",
        hobby: user?.hobby || "",
        degree: user?.degree || "",
        role: role || "visitor",
      };
      await pushDataToDoc("user", uid, data);
      setStoreData("user_creds", {
        role: role,
        token: uid,
      });
    })
    .catch((err) => {
      res.err = err;
    });
  return res;
};

/**
 * Function to login the user and fetch the user details
 * @param user User credentials {email, password}
 * @returns user data for succesful login
 */
export const loginUser = async (user: any) => {
  let res = { data: "" as any, success: false, err: "" as any };
  await signInWithEmailAndPassword(auth, user.email, user.password)
    .then(async (userCredential) => {
      console.log(userCredential);
      res = await fetchDocData("user", userCredential.user.uid);
      console.log("res", res);
      setStoreData("user_creds", {
        role: res?.data?.role,
        token: userCredential.user.uid,
      });
    })
    .catch((err) => {
      console.log(err);
      res.err = err;
    });
  return res;
};

export const isResident = (user: any) => user.role === "resident";

export const getAllResidents = async () => {
  const res = await fetchCollectionData("user");
  return res.data?.filter(isResident);
};

export const logoutUser = async () => {
  removeStoreData("user_creds");
};

export const fetchUserDetails = async () => {
  const creds = await getStoreData("user_creds");
  const res = await fetchDocData("user", creds.token);
  if (res.success) {
    return res.data;
  } else {
    return userJSON;
  }
};
