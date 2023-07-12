import React from 'react';
import './IMA.css';
import { useNavigate } from 'react-router-dom';
import { doc, collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from '../../firebase';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import secureLocalStorage from "react-secure-storage";


let pushArray = new Array();


// Return IMA
export default function ReturnIMA() {

 const navigation = useNavigate();

 const [load, setLoad] = React.useState(false);
 const [confirm, setConfirm] = React.useState(false);

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   pushArray.push(doc.id);

  });

  setConfirm(pushArray.includes(secureLocalStorage.getItem("USER")));

 }, []);


 var navigatorInfo = window.navigator;
 var navigatorScreen = window.screen;

 var uid = navigatorInfo.mimeTypes.length;
 uid += navigatorInfo.userAgent.replace(/\D+/g, '');
 uid += navigatorInfo.plugins.length;

 uid += navigatorScreen.height || '';
 uid += navigatorScreen.width || '';
 uid += navigatorScreen.pixelDepth || '';
 uid += secureLocalStorage.getItem("USER");

 const handlePath = async (event) => {

  event.preventDefault();
  setLoad(true);
  secureLocalStorage.setItem("^^pret%%finish->ok", false);
  secureLocalStorage.setItem("&&837$$commi@*#())", false);

  const frankDocRef = doc(db, confirm ? "client" : "agent", secureLocalStorage.getItem("USER"));
  // To update age and favorite color:
  await updateDoc(frankDocRef, {
   ip: uid
  });

  window.setTimeout(() => {
   navigation('/profil');
  }, 500);

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

   <div onClick={handlePath} className='head-img-dashed'>
    <img src={'/img/account-settings.png'} alt='images dash muungano' />
   </div>
  </>
 );
};
