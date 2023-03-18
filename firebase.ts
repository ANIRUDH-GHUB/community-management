// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDizVnjUTLwC9h9j57kEdl2iN5Oh_MyOdk",
  authDomain: "community-management-2a192.firebaseapp.com",
  projectId: "community-management-2a192",
  storageBucket: "community-management-2a192.appspot.com",
  messagingSenderId: "736898604039",
  appId: "1:736898604039:web:99c729a13478c229559ea2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
 