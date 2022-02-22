// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import{getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTBOOeuVnW0XUyvQdihiG2Pms31NSnCvE",
  authDomain: "insta-clone-403eb.firebaseapp.com",
  projectId: "insta-clone-403eb",
  storageBucket: "insta-clone-403eb.appspot.com",
  messagingSenderId: "1055599132539",
  appId: "1:1055599132539:web:522767c52c63e8a20207de"
};


// Initialize Firebase
const app = !getApps().length?initializeApp(firebaseConfig):getApp();
const db=getFirestore();
const storage = getStorage();

export {app ,db,storage};