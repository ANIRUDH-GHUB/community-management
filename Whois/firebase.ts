// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  qa: {
    apiKey: "AIzaSyDizVnjUTLwC9h9j57kEdl2iN5Oh_MyOdk",
    authDomain: "community-management-2a192.firebaseapp.com",
    projectId: "community-management-2a192",
    storageBucket: "community-management-2a192.appspot.com",
    messagingSenderId: "736898604039",
    appId: "1:736898604039:web:99c729a13478c229559ea2",
  },
  prod: {
    apiKey: "AIzaSyCUh9QAHXgAtd2CrBLb9AxPqI6EJnTPePM",
    authDomain: "community-management-prod.firebaseapp.com",
    projectId: "community-management-prod",
    storageBucket: "community-management-prod.appspot.com",
    messagingSenderId: "214230848526",
    appId: "1:214230848526:web:fb4e730bed22494ba6585f",
  },
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig.qa);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
