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
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
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
    return url;
  } catch (error) {
    console.error("Error uploading profile pic:", error);
    throw error;
  }
};

export const uploadProfileImg = async (imageData) => {
  try {
    const storageRef = ref(storage, `profileUsersImages/${v4()}`);
    await uploadBytes(storageRef, imageData,{contentType:"image/jpeg"});
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Error uploading profile pic:", error);
    throw error;
  }
};

export const uploadAvatarImg = async (imageData) => {
  try {
    const storageRef = ref(storage, `avatars/${v4()}`);
    await uploadBytes(storageRef, imageData,{contentType:"image/jpeg"});
    const url = await getDownloadURL(storageRef);
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


