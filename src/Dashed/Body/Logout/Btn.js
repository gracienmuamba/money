import React from 'react';
import './Btn.css';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { reactLocalStorage } from 'reactjs-localstorage';

// Quote COmpoent Component 
export default function ReturnLogouTButton() {

 const handlepathOut = () => {

  reactLocalStorage.remove('USER');
  reactLocalStorage.remove('ACTIVE_M_USER');
  reactLocalStorage.remove('##^^@@%^***^^++=$');
  reactLocalStorage.remove('@dateª©#&&++#');
  reactLocalStorage.remove('@ª©##courant**^^');
  reactLocalStorage.remove('');

  signOut(auth);
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