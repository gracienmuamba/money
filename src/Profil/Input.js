import React from 'react';
import './Input.css';
import Media from 'react-media';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';


// View Form Update view
export default function ReturnFormUpdate() {
 return (
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
 );
};

export const ScreenLarge = () => (
 <div className='wrp-form-input-update-code'>
  <FormInputField />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-form-input-update-code-sm'>
  <FormInputField />
 </div>
);
export const FormInputField = () => {

 let pushDocs = new Array();
 let regular = /[a-z]+/;

 const navigation = useNavigate();
 const { register, handleSubmit, reset } = useForm();

 // const [checked, setChecked] = React.useState(true);
 const [open, setOpen] = React.useState(false);
 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');

 const handleClickOpen = () => {
  setOpen(true);
 };
 const handleClose = () => {
  setOpen(false);
 };

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushDocs.push(doc.id);
  });

 }, []);

 const onSubmit = async (data) => {

  if (data.code.length != 6 || regular.test(data.code)) {
   setOpen(true);
   reset();

  } else {

   const verifierCollection = pushDocs.some((value) => value == JSON.parse(window.localStorage.getItem('USER')));
   updatePinInWithDocs(verifierCollection, data.code, JSON.parse(window.localStorage.getItem('USER')));
   navigation('/dash');

  };
 };

 return (
  <form onSubmit={handleSubmit(onSubmit)}>
   <input type={'password'} placeholder='••••••' {...register('code')} />

   <Dialog
    fullWidth={fullWidth}
    maxWidth={maxWidth}
    open={open}
    onClose={handleClose}
   >
    <DialogTitle>MuunganoMoney</DialogTitle>
    <DialogContent>

     <DialogContentText>
      Le mot de passe n'est valide qu'avec 6 Carractaire numérique, modifiez s'il vous plaît.
     </DialogContentText>

    </DialogContent>
    <DialogActions>
     <Button onClick={handleClose}>Fermer</Button>
    </DialogActions>
   </Dialog>


   <button className='Btn'>Enregistre</button>
  </form>
 );
};

async function updatePinInWithDocs(verifierCollection, newPin, numPhone) {
 const washingtonRef = doc(db, verifierCollection ? "client" : "agent", numPhone);
 // Set the "capital" field of the city 'DC'
 await updateDoc(washingtonRef, { code: newPin });
};
