import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { Text } from "react-native";
import { app, auth } from "../../firebase";
import { USER } from "../model/interfaces";
import user from "../../assets/json/user.json";
/**
 * This functionn creates user based on role
 * @param user USER DETAILS
 * @param role USER ROLE
 *
 */
export const createUser = async (user: USER, role: string) => {
  let success = false;
  await createUserWithEmailAndPassword(auth, user?.email, user?.password)
    .then((response) => {
      console.log(response);
      success = true;
      const uid = response.user.uid;
      const data = {
        name: user?.name || "",
        dob: user?.dob || "",
        mobile_num: user?.mobileNum || "",
        no_of_residents: user?.noOfResidents || "",
        unit: user?.unit || "",
        genre: user?.genre || "",
        hobby: user?.hobby || "",
        degree: user?.degree || "",
        role: role || "visitor",
      };
      pushDataToDoc("user", uid, data);
    })
    .catch((err) => {
      success = false;
    });
  return success;
};

/**
 * Add data to collection doc in firebase
 * @param collectionName Name of the collection eg: user, roles
 * @param id Custom id which will be used to index the data
 * @param data any data to be assigned for id
 */
export const pushDataToDoc = (
  collectionName: string,
  id: string,
  data: any
) => {
  const db = getFirestore(app);
  const ref = collection(db, collectionName);
  const docRef = doc(ref, id);
  setDoc(docRef, data)
    .then(() => {
      console.log("Document has been added succesfully");
    })
    .catch((err: any) => {
      console.log("Error adding document", err);
    });
};

export const fetchDocData = () => {};

export const fetchUserDetails = () => {
  return user;
};
