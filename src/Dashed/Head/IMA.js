import React from 'react';
import './IMA.css';
import { useNavigate } from 'react-router-dom';
import { doc, collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from '../../firebase';

let pushArray = new Array();

// Return IMA
export default function ReturnIMA() {

 const navigation = useNavigate();

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


 const handlePath = async (event) => {
  event.preventDefault();

  const frankDocRef = doc(db, confirm ? "client" : "agent", JSON.parse(window.localStorage.getItem('USER')));
  // To update age and favorite color:
  await updateDoc(frankDocRef, {
   ip: uid
  });

  window.setTimeout(() => {
   navigation('/profil');
  }, 500);

 }

 return (
  <div onClick={handlePath} className='head-img-dashed'>
   <img src={'/img/account-settings.png'} alt='images dash muungano' />
  </div>
 );
};
