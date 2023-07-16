import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


//This is the Config that directly connects to your specific account and project 
const firebaseConfig = {
  apiKey: "AIzaSyCmPnxIX5UH-_pAhMNLA-JqiqXG5p2P1Cg",
  authDomain: "crwn-clothing-db-c1d5c.firebaseapp.com",
  projectId: "crwn-clothing-db-c1d5c",
  storageBucket: "crwn-clothing-db-c1d5c.appspot.com",
  messagingSenderId: "116061936548",
  appId: "1:116061936548:web:3a4811e2f101791c07bf31"
};

const app = initializeApp(firebaseConfig);

//The google provider gives us access to the google API
const googleProvider = new GoogleAuthProvider();

//This code forces the select account popup to appear even if you only have one account
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

//Authentication Code:
export const auth = getAuth(app);
//We make a new function that takes the signinwithpopup, which takes auth (OurFirebase ID) and the google provider
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);


//Database code, we initialize firestore and set it in a const called db
export const db = getFirestore();


//The below async function takes userAuth, and additional info to create the user.
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  //we will use "doc" to define the db, the collection name and what we are looknig for in the collection
  const userDocRef = doc(db, 'users', userAuth.uid);

  //we check if we actually have the userDocRef in our database
  const userSnapshot = await getDoc(userDocRef);


  //if the docref doesnt exist(no user in db), we destructure the userAuth, which is what we passed in the parent function
  //We take the name, email and we also create a new const that saves the current time.
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    //because its async function we use try and catch, to set the document with takes the docref and we define what we need as an object
    //additional info is the 2nd argument we passed in this function, which will be used in emal and pass sign in, so it can save the display name.
    //we spread it at the end so it overwrites the initial empty string in display name 
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  //we end this with returning userdocref so that this function always returns a user when executed.
  return userDocRef;
};


//below are two functions that are used for creating and signing in the user with email and pass
//they take the same params.
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

//This is an Observer Listener where it will listen to a call back and return the auth with the call back
//This is what we will pass into the context and take in the user details
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);