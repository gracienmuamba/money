import React from 'react';
import ReturnGroup from './Group';
import { useNavigate } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import moment from 'moment';
import secureLocalStorage from "react-secure-storage";



// View Wallet Component
export default function GroupTonTine() {

 const navigation = useNavigate();
 const [open, setOpen] = React.useState(true);

 React.useEffect(() => {

  secureLocalStorage.getItem("ACTIVE_M_USER") !== true && navigation('/sign');
  window.setTimeout(() => {
   setOpen(false);
  }, 5600);

 }, []);

 let [loggedIn, setLoggedIn] = React.useState(true);

 // function to check for inativity and  log out
 const checkForInactivity = () => {

  // Get Expire  Time from local now, logout 
  const expireTime = localStorage.getItem('expireTime');

  if (expireTime < moment()) {

   window.console.log('log Out!');
   setLoggedIn(false);
   secureLocalStorage.setItem("ACTIVE_M_USER", false);
   window.localStorage.setItem('USER', JSON.stringify(null));

   signOut(auth);
   window.location.href = "/sign";

  }

 }
 // function to update expire time
 const updateExpireTime = () => {

  const expireTime = moment() + JSON.parse(window.localStorage.getItem('@expire˚˚ø')) * 60000;
  window.localStorage.setItem('expireTime', expireTime)

 }

 React.useEffect(() => {

  const interval = setInterval(() => { checkForInactivity(); }, 5000);
  // Clear interval on unmount
  return () => clearInterval(interval);

 }, []);

 React.useEffect(() => {

  // set Initial Expire Time
  updateExpireTime();

  // set event linestener
  window.addEventListener('click', updateExpireTime);
  window.addEventListener('keypress', updateExpireTime);
  window.addEventListener('scroll', updateExpireTime);
  window.addEventListener('mousemove', updateExpireTime);

  // clean up
  return () => {
   window.addEventListener('click', updateExpireTime);
   window.addEventListener('keypress', updateExpireTime);
   window.addEventListener('scroll', updateExpireTime);
   window.addEventListener('mousemove', updateExpireTime);
  }


 }, []);

 return (
  <>
   <ReturnGroup />
   <div className='zindex-theme'>
    <Backdrop
     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
     open={open}>
     <CircularProgress color="inherit" />

    </Backdrop>
   </div>

  </>
 );
};