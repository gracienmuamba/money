import React from 'react';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';
import { reactLocalStorage } from 'reactjs-localstorage';
import ls from 'localstorage-slim';
import secureLocalStorage from "react-secure-storage";


let expireNum = 10;
let pushArray = new Array();

export const PhoneAuth = () => {

 const [confirm, setConfirm] = React.useState(false);
 const [disable, setDisable] = React.useState(false);

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   pushArray.push(doc.id);

  });

  setConfirm(pushArray.includes(secureLocalStorage.getItem("USER")));

 }, []);

 let phone = secureLocalStorage.getItem("USER");
 phone = phone.slice(1, 10);
 phone = '+243' + phone;

 var uiConfig = {

  callbacks: {
   signInSuccessWithAuthResult: async function (authResult, redirectUrl) {

    // User successfully signed in.
    if (authResult.user.phoneNumber == phone) {

     setDisable(true)
     window.localStorage.setItem('USER', JSON.stringify('0' + (authResult.user.phoneNumber).slice(4, 13)));
     secureLocalStorage.setItem("ACTIVE_M_USER", true);
     window.localStorage.setItem('@expire˚˚ø', JSON.stringify(expireNum));
     ls.set('last##73**++Phone &&*@&&@@Number', secureLocalStorage.getItem("USER"), { encrypt: true, secret: 500 });

     window.setTimeout(() => {
      // window.location.href = 'http://localhost:3000/dash';
      window.location.href = 'https://muungano-money.netlify.app/dash';
     }, 1200);

    } else {

     setDisable(false)
     reactLocalStorage.remove('ACTIVE_M_USER');
     reactLocalStorage.remove('USER');
     reactLocalStorage.remove('@expire˚˚ø');

     window.setTimeout(() => {
      // window.location.href = 'http://localhost:3000/';
      window.location.href = 'https://muungano-money.netlify.app/'
     }, 1200);

    }
    console.log("sign in success");
    // don't redirect automatically
    return false;
   }
  },

  // signInSuccessUrl: 'http://localhost:3000',
  signInOptions: [
   // Leave the lines as is for the providers you want to offer your users.
   // firebase.auth.GoogleAuthProvider.PROVIDER_ID,

   {
    provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    defaultCountry: 'CD',

    defaultNationalNumber: secureLocalStorage.getItem("USER"),
    loginHint: '+243' + (secureLocalStorage.getItem("USER")).slice(1, 10),

    // Invisible reCAPTCHA with image challenge and bottom left badge.
    recaptchaParameters: {
     size: 'invisible',
    }
   },

   firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  // tosUrl: 'https://muungano-money.netlify.app/',
  // Privacy policy url/callback.
  privacyPolicyUrl: function () {
   window.location.assign('');
  }

 };

 if (disable) {

  (async () => {
   const cityRef = doc(db, confirm ? 'client' : 'agent', secureLocalStorage.getItem("USER"));
   setDoc(cityRef, { ip: secureLocalStorage.getItem("ip^^valid-&&access++dash") }, { merge: true });
  })();

  // updateIpForDocFirestore(confirm, secureLocalStorage.getItem('ip^^valid-&&access++dash'));
 };

 React.useEffect(async () => {

  try {

   let ui = new firebaseui.auth.AuthUI(firebase.auth());
   ui.start("#firebaseui-auth-container", uiConfig);
   return () => {
    ui.delete();
   };

  } catch (e) {

   window.console.log(e)
  }

 }, []);


 return (
  <div id='firebaseui-auth-container'></div>
 );
};

export default PhoneAuth;
