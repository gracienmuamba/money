import React from 'react';
import './Btn.css';
import { auth, db } from '../../../firebase';
import { signOut } from "firebase/auth";
import { doc, setDoc, collection, getDocs, updateDoc } from "firebase/firestore";

import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { reactLocalStorage } from 'reactjs-localstorage';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import secureLocalStorage from "react-secure-storage";


let pushArray = new Array();


// Quote COmpoent Component 
export default function ReturnLogouTButton() {

 const [list, setList] = React.useState([]);
 const [load, setLoad] = React.useState(false);

 var navigatorInfo = window.navigator;
 var navigatorScreen = window.screen;

 var uid = navigatorInfo.mimeTypes.length;
 uid += navigatorInfo.userAgent.replace(/\D+/g, '');
 uid += navigatorInfo.plugins.length;

 uid += navigatorScreen.height || '';
 uid += navigatorScreen.width || '';
 uid += navigatorScreen.pixelDepth || '';
 uid += secureLocalStorage.getItem("USER");

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   pushArray.push(doc.id);

  });

  setList(pushArray);
 }, []);

 const handlepathOut = async () => {

  setLoad(true);

  const docRef = doc(db, list.includes(secureLocalStorage.getItem("USER")) ? 'client' : 'agent', secureLocalStorage.getItem("USER"));
  // Update the timestamp field with the value from the server
  await updateDoc(docRef, {
   ip: uid
  });

  window.setTimeout(() => {

   reactLocalStorage.remove('USER');
   reactLocalStorage.remove('ACTIVE_M_USER');
   reactLocalStorage.remove('@expire˚˚ø');
   reactLocalStorage.remove('expireTime');

   reactLocalStorage.remove('A@@ph$$&-@#');
   reactLocalStorage.remove('@money!#!');
   reactLocalStorage.remove('@unite!#!');
   reactLocalStorage.remove('@frais!#!');
   reactLocalStorage.remove('@solde!#!');
   reactLocalStorage.remove('@main!#!');
   reactLocalStorage.remove('@ª©##');
   reactLocalStorage.remove('@ª©##courant**^^');
   reactLocalStorage.remove('@dateª©#&&++#');
   reactLocalStorage.remove('##^^@@%^***^^++=$');
   reactLocalStorage.remove('@cost##');
   reactLocalStorage.remove('&&$$!@lis::**swap++');
   reactLocalStorage.remove('&&lis++$$!@lis::**||{}');
   reactLocalStorage.remove('');


   secureLocalStorage.removeItem("ip^^valid-&&access++dash");

  }, 1000);

  signOut(auth);
  window.setTimeout(() => {
   window.location.href = "/";
  }, 999);

 };
 return (
  <>
   <div className='zindex-theme'>
    <Backdrop
     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
     open={load}>

     <CircularProgress color="inherit" />
    </Backdrop>
   </div>

   <div onClick={handlepathOut} className='wrp-logout-ima'>

    <Chip
     variant="outlined"
     label={<div className='child-custom'>Déconnecter</div>}
     color="info" avatar={<Avatar src="/img/pwer.png" />}

    />

   </div>

  </>
 );
};

export const updateAuthIPFirebase = async (check) => {

 var navigatorInfo = window.navigator;
 var navigatorScreen = window.screen;

 var uid = navigatorInfo.mimeTypes.length;
 uid += navigatorInfo.userAgent.replace(/\D+/g, '');
 uid += navigatorInfo.plugins.length;

 uid += navigatorScreen.height || '';
 uid += navigatorScreen.width || '';
 uid += navigatorScreen.pixelDepth || '';
 uid += secureLocalStorage.getItem("USER");

 const cityRef = doc(db, check ? 'client' : 'agent', secureLocalStorage.getItem("USER"));
 setDoc(cityRef, { ip: uid }, { merge: true });

};