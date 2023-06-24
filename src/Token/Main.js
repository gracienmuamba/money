import React from 'react';
import AuthFirebaseToken from './Firebaseui';
import { useNavigate } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import moment from 'moment';


// View Wallet Component
export default function AuthToKen() {

 const [open, setOpen] = React.useState(true);

 React.useEffect(() => {
  window.setTimeout(() => {
   setOpen(false);
  }, 5600);

 }, []);

 return (
  <>
   <AuthFirebaseToken />
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