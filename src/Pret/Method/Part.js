import React from 'react';
import { TweenMax, Expo } from 'gsap';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from "react-secure-storage";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';


// View all 
export default function ReturnPart() {

 const [open, setOpen] = React.useState(false);

 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');

 let link = secureLocalStorage.getItem("solde&&%%¢pret");
 const navigation = useNavigate();

 const handleClose = () => {
  setOpen(false);
 }

 React.useEffect(() => {
  TweenMax.from('.Anima2', 1.2, { delay: .8, opacity: 0, x: -20, ease: Expo.easeIn });
 }, []);

 const handlepath = (event) => {
  event.preventDefault();
  setOpen(true);
  // navigation(link);
 }

 return (
  <>
   <div onClick={handlepath} className='all-pret-method Anima2'>
    <img src={'/img/refund.png'} />
    <p>Partie</p>
   </div>

   <Dialog
    fullWidth={fullWidth}
    maxWidth={maxWidth}
    open={open}
    onClose={handleClose}>

    <DialogTitle><h1 className='pop-up'>MuunganoMoney</h1></DialogTitle>
    <DialogContent>

     <DialogContentText>
      <p className='pop-up'>
       Le remboursement partiel du prêt est temporairement indisponible, veuillez contacter
       MuunganoMoney pour plus d'informations.
     </p>
     </DialogContentText>

    </DialogContent>
    <DialogActions>
     <Button onClick={handleClose}><span className='pop-up'>Fermer</span></Button>
    </DialogActions>
   </Dialog>

  </>
 )
};