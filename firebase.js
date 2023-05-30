import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
  //add firebase config in this section 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const database = getDatabase()
const auth = getAuth(app);
const storage = getStorage(app);

export {app,analytics,db,auth,storage,database}