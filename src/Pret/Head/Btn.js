import React from 'react';
import './Btn.css';
import Media from 'react-media';
import { doc, onSnapshot, getDocs, collection } from "firebase/firestore";
import { db } from '../../firebase';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from "react-secure-storage";


export let exchAnge = 0; // Export view 
let pushDocs = new Array();


// Return Phone input component
export default function REturnCurrenT() {
 return (
  <>
   <Media
    queries={{
     small: '(max-width: 599px)',
     medium: '(min-width: 600px) and (max-width:1199px)',
     large: '(min-width: 1200px)',
    }}>
    {matches => (
     <>
      {matches.small && <ScreenSmall />}
      {matches.medium && <ScreenLarge />}
      {matches.large && <ScreenLarge />}
     </>
    )}
   </Media>
  </>
 );
};

export const ScreenLarge = () => {
 return (
  <div className='wrp-pret-btn-next'>
   <FormInputValue />
  </div>
 );
};
export const ScreenSmall = () => {
 return (
  <div className='wrp-pret-btn-next-sm'>
   <FormInputValue />
  </div>
 )
};

export const FormInputValue = () => {

 const navigation = useNavigate();

 const [open, setOpen] = React.useState(false);
 const [pret, setPret] = React.useState(false);
 const [pretregister, setPretregister] = React.useState(false);

 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');

 const [check, setCheck] = React.useState(false);

 const handleClose = () => {
  setOpen(false);
 };
 const checkClose = () => {
  setCheck(false);
 };

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  try {
   const unsub = onSnapshot(doc(db, "client", secureLocalStorage.getItem("USER")), (doc) => {
    setPret(doc.data().pret);
    setPretregister(doc.data().pretregister);
   });
  } catch {
   window.console.log('error');
  }

 }, []);

 const handleIncrementMoney = (event) => {

  event.preventDefault();

  if (pret === false) {
   setCheck(true);
  } else {

   if (pret === true && pretregister === false) {
    navigation('/pret/devise');
    secureLocalStorage.setItem("@!pret&*access*^^", true);
   } else if (pret === true && pretregister == true) {
    navigation('/pret/send');
    secureLocalStorage.setItem("@!pret&*access*^^", true);
   } else {
    window.console.log('valid pret');
   }

  }

 };

 return (
  <>
   <div onClick={handleIncrementMoney} className='Btn'>
    <span>Continue</span>
   </div>

   <Dialog
    fullWidth={fullWidth}
    maxWidth={maxWidth}
    open={open}
    onClose={handleClose}>
    <DialogTitle><span className='pop-up'>MuunganoMoney</span></DialogTitle>
    <DialogContent>

     <DialogContentText>
      <p className='pop-up'>
       Désolé, vous n'êtes pas autorisé à utiliser ce service,
       Veuillez contacter le D.Commercial  au (0899670921)
     </p>
     </DialogContentText>

    </DialogContent>
    <DialogActions>
     <Button onClick={handleClose}><span className='pop-up'>Fermer</span></Button>
    </DialogActions>
   </Dialog>

   <Dialog
    fullWidth={fullWidth}
    maxWidth={maxWidth}
    open={check}
    onClose={checkClose}>
    <DialogTitle><span className='pop-up'>MuunganoMoney</span></DialogTitle>
    <DialogContent>

     <DialogContentText>

      <p className='pop-up'>
       Vous n’êtes pas autoriser au service Prêt Veuillez contacter
       le DC au 0899670921
     </p>

     </DialogContentText>

    </DialogContent>
    <DialogActions>
     <Button onClick={checkClose}><span className='pop-up'>Fermer</span></Button>
    </DialogActions>
   </Dialog>

  </>
 );
};
