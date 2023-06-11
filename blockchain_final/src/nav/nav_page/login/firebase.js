// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSFdWFITf0jWnWowUXXzBLCx5r35wXuAo",
  authDomain: "react-auth-d3bc4.firebaseapp.com",
  projectId: "react-auth-d3bc4",
  storageBucket: "react-auth-d3bc4.appspot.com",
  messagingSenderId: "939764523122",
  appId: "1:939764523122:web:5eec0e809551c38632a2eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =getAuth(app);
export const provide =new GoogleAuthProvider();