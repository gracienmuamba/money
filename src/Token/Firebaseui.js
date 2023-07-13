import React from 'react';
import firebase from 'firebase/compat/app';
import PhoneAuth from './PhoneAuth';
import { onAuthStateChanged } from 'firebase/auth';
import './Firebaseui.css';
import NavBar from './Nav/Main';

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
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service

export default function AuthFirebaseToken() {
 const [user, setUser] = React.useState(null);

 React.useEffect(() => {
  const unRegistered = onAuthStateChanged(firebase.auth(), (currentUser) => {
   setUser(currentUser);
  })
  return () => unRegistered();

 });

 return (
  <>
   <NavBar />

   <div className='container-firebaseui'>

    <h4>Authentification avec un numéro de téléphone</h4>

    <p>
     Pour accéder à votre compte avec un autre
     appareil, vous devez valider
     le code envoyé par SMS à votre numéro.
   </p>

    <PhoneAuth />
   </div>
  </>
 );
};