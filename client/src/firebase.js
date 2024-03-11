// import { initializeApp } from "firebase/app";


// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "internship-assignment-1.firebaseapp.com",
//   projectId: "internship-assignment-1",
//   storageBucket: "internship-assignment-1.appspot.com",
//   messagingSenderId: "541583473176",
//   appId: "1:541583473176:web:23ba911b5dfaa8baf4616d"
// };

// export const app = initializeApp(firebaseConfig);



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId isoptional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "project-1-ca53a.firebaseapp.com",
  projectId: "project-1-ca53a",
  storageBucket: "project-1-ca53a.appspot.com",
  messagingSenderId: "280296275077",
  appId: "1:280296275077:web:7c232d4403ae5370d4fdec",
  measurementId: "G-ML4CVGM823"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
