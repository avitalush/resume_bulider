import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMhsAW758nEYsan-YzaD1S4S7qDsq1vYg",
  authDomain: "resume-95d52.firebaseapp.com",
  projectId: "resume-95d52",
  storageBucket: "resume-95d52.appspot.com",
  messagingSenderId: "906616507015",
  appId: "1:906616507015:web:19a5abd79aa18b8b808622",
  measurementId: "G-2VW51TZZGV"
};

export const app = initializeApp(firebaseConfig);
export const database=getFirestore(app);
export const storage = getStorage();
const analytics = getAnalytics(app);