import React from 'react';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { doc, collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import { reactLocalStorage } from 'reactjs-localstorage';

let expireNum = 10;
let pushArray = new Array();

export const PhoneAuth = () => {

 const [confirm, setConfirm] = React.useState(false);
 const [phoneAuth, setPhoneAuth] = React.useState(null);

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   pushArray.push(doc.id);

  });

  setConfirm(pushArray.includes(JSON.parse(window.localStorage.getItem('USER'))));

 }, []);


 let phone = JSON.parse(window.localStorage.getItem('USER'));
 phone = phone.slice(1, 10)
 phone = '+243' + phone;


 window.console.log(phoneAuth);

 var uiConfig = {
  callbacks: {
   signInSuccessWithAuthResult: async function (authResult, redirectUrl) {

    // User successfully signed in.
    if (authResult.user.phoneNumber == phone) {

     setPhoneAuth(true);

     window.localStorage.setItem('USER', JSON.stringify('0' + (authResult.user.phoneNumber).slice(4, 13)));
     window.localStorage.setItem('ACTIVE_M_USER', JSON.stringify(true));
     window.localStorage.setItem('@expire˚˚ø', JSON.stringify(expireNum));
     window.location.href = 'https://muungano-money.netlify.app/dash';

    } else {

     setPhoneAuth(false);
     reactLocalStorage.remove('ACTIVE_M_USER');
     reactLocalStorage.remove('USER');
     reactLocalStorage.remove('@expire˚˚ø');

     window.location.href = 'https://muungano-money.netlify.app/'

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
   // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
   // firebase.auth.EmailAuthProvider.PROVIDER_ID,
   {
    provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    defaultCountry: 'CD',

    defaultNationalNumber: JSON.parse(window.localStorage.getItem('USER')),
    loginHint: '+243' + (JSON.parse(window.localStorage.getItem('USER'))).slice(1, 10),

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
 React.useEffect(async () => {

  let ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start("#firebaseui-auth-container", uiConfig);
  return () => {
   ui.delete();
  };

 }, []);

 return (
  <div id='firebaseui-auth-container'></div>
 );
};

export default PhoneAuth;
