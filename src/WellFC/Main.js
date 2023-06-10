import * as React from 'react';
import ReturnWithdrAw from './Withdraw';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { gsap, Expo } from 'gsap';

import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import moment from 'moment';



const Alert = React.forwardRef(function Alert(props, ref) {
 return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Main Withdraw Sucess
export default function WithdrawSuccess() {

 const [state, setState] = React.useState({
  open: JSON.parse(window.localStorage.getItem('@cost##')),
  vertical: 'top',
  horizontal: 'right',
 });

 const navigation = useNavigate();
 const { vertical, horizontal, open } = state;

 const handleClick = (newState) => () => {
  setState({ open: true, ...newState });
 };
 const handleClose = () => {
  setState({ ...state, open: false });
 };


 React.useEffect(() => {
  window.setTimeout(() => {
   gsap.to('.App-loading-blank', 0, { delay: .1, x: '-1000%', opacity: 0, ease: Expo.easeIn })
  }, 50);

 }, []);

 const buttons = (
  <React.Fragment>

   <Button
    onClick={handleClick({
     vertical: 'top',
     horizontal: 'right',
    })}
   >
    Top-Right
      </Button>


  </React.Fragment>
 );


 // const navigation = useNavigate();
 const [view, setView] = React.useState(true);

 React.useEffect(() => {

  JSON.parse(window.localStorage.getItem('ACTIVE_M_USER')) !== true && navigation('/sign');
  window.setTimeout(() => {
   setView(false);
  }, 7600);

 }, []);

 let [loggedIn, setLoggedIn] = React.useState(true);

 // function to check for inativity and  log out
 const checkForInactivity = () => {

  // Get Expire  Time from local now, logout 
  const expireTime = localStorage.getItem('expireTime');

  if (expireTime < moment()) {


   window.console.log('log Out!');
   setLoggedIn(false);

   window.localStorage.setItem('ACTIVE_M_USER', JSON.stringify(false));
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
   <div className='App-loading-blank'></div>
   <ReturnWithdrAw />
   <div>
   </div>
  </>
 );
};