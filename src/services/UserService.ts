import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { Text } from "react-native";
import { app, auth } from "../../firebase";
import { RESIDENT_USER } from "../model/interfaces";

/**
 * This functionn creates user based on role
 * @param user USER DETAILS
 * @param role USER ROLE
 * 
 */
export const createUser = (user: RESIDENT_USER, role: string) => {
  createUserWithEmailAndPassword(auth, user?.email, user?.password).then(
    (response) => {
      console.log(response);
      const uid = response.user.uid;
      const roleData = {
        role: role,
      };
      pushDataToDoc("roles", uid, roleData);

      const data = {
        name: user?.name,
        dob: user?.dob,
        mobile_num: user?.mobileNum,
        no_of_residents: user?.noOfResidents,
        unit: user?.unit,
        genre: user?.genre,
        hobby: user?.hobby,
        degree: user?.degree,
      };
      pushDataToDoc(role, uid, data);
    }
  );
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
