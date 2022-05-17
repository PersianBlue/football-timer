import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
const firebaseConfig = {
  apiKey: "AIzaSyBiZvwsgbMvvT07kzUiL4YzhzxgJnrWmww",
  authDomain: "footballtimer-fb056.firebaseapp.com",
  projectId: "footballtimer-fb056",
  storageBucket: "footballtimer-fb056.appspot.com",
  messagingSenderId: "435963563802",
  appId: "1:435963563802:web:eaf8e0933b699f3b12e6a3",
  measurementId: "G-ZD0F9X0XZX",
};
// Initial

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// const provider = new firebase.auth.GoogleAuthProvider();

// signInWithPopup(authentication, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // ...
//     console.log(user.displayName);
//     console.log(user.email);
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });
