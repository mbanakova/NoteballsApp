
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyByRslzPCVEXrfHMXMyAzBzj_cizhd46sw",
  authDomain: "noteballs-e7a1a.firebaseapp.com",
  projectId: "noteballs-e7a1a",
  storageBucket: "noteballs-e7a1a.appspot.com",
  messagingSenderId: "565392389261",
  appId: "1:565392389261:web:7d94c529c2472be2eddec4"
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }