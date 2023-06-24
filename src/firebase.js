// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyD1pX6eJB5Kuus_YnPB5-TRgXMgXgYBayU",
 authDomain: "ungamamoney-wallet.firebaseapp.com",
 projectId: "ungamamoney-wallet",
 storageBucket: "ungamamoney-wallet.appspot.com",
 messagingSenderId: "453269696941",
 appId: "1:453269696941:web:64acb5556f509236a7f124"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service


export const db = getFirestore();
export const auth = getAuth(app);
auth.languageCode = 'fr';


// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);