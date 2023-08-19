// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getStorage, ref, uploadBytes, getDownloadURL,uploadString } from "firebase/storage";
import { v4 } from "uuid";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnHWEOwv-ZcU6JD0pXh079uMOF-S0irH0",
  authDomain: "christmasstore-c5b20.firebaseapp.com",
  projectId: "christmasstore-c5b20",
  storageBucket: "christmasstore-c5b20.appspot.com",
  messagingSenderId: "797441401606",
  appId: "1:797441401606:web:138b5f1305e4eb6b59f487",
  measurementId: "G-SB9QTM64HT",
  storageBucket: "gs://christmasstore-c5b20.appspot.com",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const uploadProfilePic = async (imageData) => {
  try {
    const storageRef = ref(storage, `profileUsersImages/${v4()}`);
    await uploadString(storageRef, imageData,"base64");
    const url = await getDownloadURL(storageRef);
    console.log("Uploaded file at:", url);
    return url;
  } catch (error) {
    console.error("Error uploading profile pic:", error);
    throw error;
  }
};

export const uploadProductPic = async (imageData) => {
  try {
    const storageRef = ref(storage, `products/${v4()}`);
    await uploadString(storageRef, imageData,"base64");
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Error uploading profile pic:", error);
    throw error;
  }
}

export default app;


