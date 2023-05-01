import { collection, doc, getFirestore, setDoc} from "firebase/firestore";
import { app } from "../../firebase";

// export const getAllServicesById =  () => {
//     return  servicejson;
// };

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
