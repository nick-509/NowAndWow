import { initializeApp } from 'firebase/app';

import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, ProviderId } from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyBfvkxkMLrXmJMkUn-ZBqngbs9PgPPVwMs",
  authDomain: "nowandwow-db.firebaseapp.com",
  projectId: "nowandwow-db",
  storageBucket: "nowandwow-db.appspot.com",
  messagingSenderId: "369771071645",
  appId: "1:369771071645:web:de23e0598c1bf531e8ec74"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUSerDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "user", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;

    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName, email, createdAt
      })
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
  //  if user data exists

  // create/ set the document with the data from userAuth in my collection

  // if user data does not exists

  // return userDocRef
};