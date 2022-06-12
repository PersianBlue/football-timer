import { auth, db } from "../../firebase-config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

//adds given user to the "users" collection in Firestore
const addUserToDatabase = async (user) => {
  try {
    console.log("Adding user to database");
    const docRef = await setDoc(doc(db, "users", user.uid), {
      UserID: user.uid,
      Email: user.email,
      Name: user.displayName,
    });
    console.log("User has been added to database");
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

//checks "users" collection in Firestore to see if the current user already exists there
const checkIfUserExists = async (user) => {
  console.log("Checking if user exists");
  return getDocs(collection(db, "users"))
    .then((querySnapshot) => {
      var exists = false;
      querySnapshot.forEach((doc) => {
        if (doc.data().UserID === user.uid) {
          console.log("This user exists");
          // console.log(doc.data());
          exists = true;
        }
      });
      return exists;
    })
    .catch((err) => {
      console.log(err);
    });
};

const signInWithGoogle = () => {
  console.log("Signing in with Google ");
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((userCred) => {
      console.log("We signed in with the popup");
      checkIfUserExists(userCred.user).then((userExists) => {
        console.log("User exists: ", userExists);
        if (userExists) {
          return userCred;
        } else if (!userExists) {
          console.log("Calling add user to database");
          addUserToDatabase(userCred.user);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    }); //end sign in with popup
};

export default signInWithGoogle;
