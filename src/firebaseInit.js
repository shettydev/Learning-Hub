// ********* Import necessary libraries and functions *********
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7NgjOaGHxMEZ3zO-Rzown9BDV_vMgSMI",
  authDomain: "learninghub-311d4.firebaseapp.com",
  projectId: "learninghub-311d4",
  storageBucket: "learninghub-311d4.appspot.com",
  messagingSenderId: "1082329356413",
  appId: "1:1082329356413:web:d4a9c34a919d3c1feb3914",
  measurementId: "G-WX6ET3J5VS"
};

// ********* Initialize Firebase *********
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


