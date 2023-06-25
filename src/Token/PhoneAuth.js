import React from 'react';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { doc, collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from '../firebase';


let expireNum = 10;
let pushArray = new Array();

export const PhoneAuth = () => {

 const [confirm, setConfirm] = React.useState(false);
 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   pushArray.push(doc.id);

  });

  setConfirm(pushArray.includes(JSON.parse(window.localStorage.getItem('USER'))));

 }, []);

 var navigatorInfo = window.navigator;
 var navigatorScreen = window.screen;

 var uid = navigatorInfo.mimeTypes.length;
 uid += navigatorInfo.userAgent.replace(/\D+/g, '');
 uid += navigatorInfo.plugins.length;

 uid += navigatorScreen.height || '';
 uid += navigatorScreen.width || '';
 uid += navigatorScreen.pixelDepth || '';
 uid += JSON.parse(window.localStorage.getItem('USER'));

 var uiConfig = {
  callbacks: {
   signInSuccessWithAuthResult: async function (authResult, redirectUrl) {
    // User successfully signed in.
    console.log("sign in success");
    // window.localStorage.setItem('Ex47jorXU49V+GVNt7jmtI33vaG9N8d+ckoZd0f4set0XiaOM5WuKL8yB5dDUSgh8gbloNcH+CzP5tGMRNBi3YgLK7Zc', true);

    window.localStorage.setItem('ACTIVE_M_USER', JSON.stringify(true));
    window.localStorage.setItem('@expire˚˚ø', JSON.stringify(expireNum));

    // don't redirect automatically
    return false;
   }
  },

  signInSuccessUrl: 'https://muungano-money.netlify.app/dash',
  signInOptions: [
   // Leave the lines as is for the providers you want to offer your users.
   // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
   // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
   // firebase.auth.EmailAuthProvider.PROVIDER_ID,
   firebase.auth.PhoneAuthProvider.PROVIDER_ID,
   firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  // tosUrl: 'http://localhost:3000/dash',
  // Privacy policy url/callback.
  privacyPolicyUrl: function () {
   window.location.assign('https://muungano-money.netlify.app/dash');
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
