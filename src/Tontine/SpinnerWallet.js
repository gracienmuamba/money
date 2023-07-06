import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import secureLocalStorage from "react-secure-storage";


const Alert = React.forwardRef(function Alert(props, ref) {
 return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ReturnSpinnerWalleT() {

 const [open, setOpen] = React.useState(secureLocalStorage.getItem("prix^^&&not**"));

 const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
   return;
  }

  setOpen(false);
 };

 return (
  <Stack sx={{ width: '100%' }}>
   <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
     <p className='pop-up'>
      Portefeuille a été augmenté.
     </p>
    </Alert>
   </Snackbar>
  </Stack>
 );
};