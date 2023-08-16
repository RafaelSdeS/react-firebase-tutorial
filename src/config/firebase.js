import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAVwA1d0R6kNXMoTJA_4kTBSGmbYREvRZo",
  authDomain: "fir-tutorial-d8c4a.firebaseapp.com",
  projectId: "fir-tutorial-d8c4a",
  storageBucket: "fir-tutorial-d8c4a.appspot.com",
  messagingSenderId: "629553471494",
  appId: "1:629553471494:web:9ed2105edddad392952387",
  measurementId: "G-WFTQ8D7SZR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
