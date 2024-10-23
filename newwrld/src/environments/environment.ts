import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCEhMDKeIwfhIppq0Phuc8XG4dHtU3B59Q",
    authDomain: "newworld-957ea.firebaseapp.com",
    projectId: "newworld-957ea",
    storageBucket: "newworld-957ea.appspot.com",
    messagingSenderId: "26916983648",
    appId: "1:26916983648:web:803dbbe94ffa5faf768405",
    measurementId: "G-GHGRZ0XE81"
  }
};

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const firestore = getFirestore(app);
