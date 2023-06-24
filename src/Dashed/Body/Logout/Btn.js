import React from 'react';
import './Btn.css';
import { auth } from '../../../firebase';
import { getAuth, deleteUser, signOut } from "firebase/auth";

import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { reactLocalStorage } from 'reactjs-localstorage';



// Quote COmpoent Component 
export default function ReturnLogouTButton() {

 const handlepathOut = () => {

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

  signOut(auth);
  const user = auth.currentUser;
  window.location.href = "/";

 };
 return (
  <div onClick={handlepathOut} className='wrp-logout-ima'>

   <Chip
    variant="outlined"
    label={<div className='child-custom'>Déconnecter</div>}
    color="info" avatar={<Avatar src="/img/pwer.png" />}

   />

  </div>
 );
};