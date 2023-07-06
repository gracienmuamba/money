import React from 'react';
import { TweenMax, Power3 } from 'gsap';
import { useNavigate } from 'react-router-dom';
import FadeLoader from 'react-spinners/FadeLoader';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import { exportVodA } from './Vodacom';
import { exportAirtel } from './Airtel';
import { exportAfricell } from './Africell';
import { exportOrange } from './Orange';


// Btn Component Hm
export default function RetuRnBtn() {

 const navigation = useNavigate();
 const [loading, setLoading] = React.useState(false);

 const [open, setOpen] = React.useState(false);
 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');

 const handleClose = () => {
  setOpen(false);
 };
 React.useEffect(() => {
  TweenMax.from('.wrp-btn-brokers button', 1, { delay: 1.4, opacity: 0, x: 0, ease: Power3.easeIn })
 }, []);

 const handlepath = (event) => {

  event.preventDefault();
  setLoading(true)

  if (exportVodA || exportAirtel || exportAfricell || exportOrange) {
   navigation('/brokers/unite/number');
  } else {
   setLoading(false);
   setOpen(true);
  }

 }

 return (
  <div className='wrp-btn-brokers'>

   {loading && <div className='App-Icon'>
    <FadeLoader
     size={15}
     color={'#596475'}
     loading={loading}
    />
   </div>}


   <button onClick={handlepath} className='btn-broker'>
    <span>Continue</span>
   </button>

   <Dialog
    fullWidth={fullWidth}
    maxWidth={maxWidth}
    open={open}
    onClose={handleClose}
   >
    <DialogTitle><p className='pop-up'>MuunganoMoney</p></DialogTitle>
    <DialogContent>

     <DialogContentText>
      <p className='pop-up'>
       Veuillez sélectionner le réseau que vous souhaitez créditer
     </p>
     </DialogContentText>

    </DialogContent>
    <DialogActions>
     <Button onClick={handleClose}><span className='pop-up'>Fermer</span></Button>
    </DialogActions>
   </Dialog>

  </div>
 );
};