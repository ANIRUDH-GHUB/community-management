import {
  collection,
  doc,
  getFirestore,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../../firebase";
import { COLLLECTIONS } from "../model/interfaces";

/**
 * Add data to collection doc in firebase
 * @param collectionName Name of the collection eg: user, roles
 * @param id Custom id which will be used to index the data
 * @param data any data to be assigned for id
 */
export const pushDataToDoc = async (
  collectionName: COLLLECTIONS,
  id: string,
  data: any
) => {
  const db = getFirestore(app);
  const ref = collection(db, collectionName);
  let docRef;
  if (id == "") {
    docRef = doc(ref);
    console.log("came");
  } else {
    docRef = doc(ref, id);
  }
  await setDoc(docRef, data)
    .then(() => {
      console.log("Document has been added succesfully");
    })
    .catch((err: any) => {
      console.log("Error adding document", err);
    });
};

/**
 * Fetched data from collection doc in firebase
 * @param collectionName Name of the collection eg: user, roles
 * @param id id that is used to index the data in collection
 * @returns item in a collection that is indexed to the id
 */
export const fetchDocData = async (
  collectionName: COLLLECTIONS,
  id: string
) => {
  const db = getFirestore(app);
  const ref = collection(db, collectionName);
  const docRef = doc(ref, id);
  const res = { data: "" as any, success: false, err: "" };
  await getDoc(docRef)
    .then((doc) => {
      if (doc.exists()) {
        // console.log("Document data:", doc.data());
        res.success = true;
        res.data = doc.data() as any;
        res.data.uid = id;
      } else {
        console.log("No such document!");
        res.err = "Document not found";
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
      res.err = error;
    });
  return res;
};

export const updateDocData = async (
  collectionName: COLLLECTIONS,
  id: string,
  data: any
) => {
  const db = getFirestore(app);
  const ref = collection(db, collectionName);
  const docRef = doc(ref, id);
  const res = { data: "" as any, success: false, err: "" };
  updateDoc(docRef, data)
    .then(() => {
      console.log("doc updated");
      res.success = true;
    })
    .catch((err) => console.log("Error while updating the document"));
  return res;
};

export const deleteDataFromDoc = async (
  collectionName: COLLLECTIONS,
  id: string
) => {
  const db = getFirestore(app);
  const ref = collection(db, collectionName);
  const docRef = doc(ref, id);
  deleteDoc(docRef)
    .then(() => {
      console.log("deleted doc successfully");
    })
    .catch((err) => {
      console.log("Error while deleting document:", err);
    });
};

export const fetchCollectionData = async (collectionName: COLLLECTIONS) => {
  const db = getFirestore(app);
  const ref = collection(db, collectionName);

  const res = { data: [] as any[], success: false, err: "" as any };
  await getDocs(ref)
    .then((docs) => {
      docs?.forEach((doc) => {
        const data = doc.data();
        data.uid = doc.id;
        res.data.push(data);
      });
    })
    .catch((error) => {
      console.log("Error getting document:", error);
      res.err = error;
    });
  return res;
};
