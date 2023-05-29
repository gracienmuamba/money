import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import './Head.css';
import PretNav from './Nav/Main';
import PrIx from './Prix/Main';


const Alert = React.forwardRef(function Alert(props, ref) {
 return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


// Return View COmponent 
export default function ReturnHeAd() {

 const [open, setOpen] = React.useState(JSON.parse(window.localStorage.getItem('^^snack->')));
 const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
   return;
  }
  setOpen(false);
 };

 return (
  <>
   <div className='head-dash-pret'>
    <PretNav />
    <PrIx />
   </div>

   <Stack sx={{ width: '100%' }}>

    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
     <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
      {/* <p className='pop-up'></p> */}
       Remboursement effectué
     </Alert>
    </Snackbar>

   </Stack>
  </>
 );
};