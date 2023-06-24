import React from 'react';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { collection, getDocs, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


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
 <div className='wrp-form-input-nows'>
  <FormInputField />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-form-input-nows'>
  <FormInputField />
 </div>
);
export const FormInputField = () => {

 let pushDocs = new Array();
 let regular = /[a-z]+/;

 const navigation = useNavigate();
 const { register, handleSubmit, reset, control } = useForm({});
 const [pin, setPin] = React.useState(null);

 const [open, setOpen] = React.useState(false);
 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');
 const [showPassword, setShowPassword] = React.useState(false);

 const handleClickShowPassword = () => setShowPassword((show) => !show);
 const handleMouseDownPassword = (event) => {
  event.preventDefault();
 };

 const handleClose = () => {
  setOpen(false);
 };

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  const verifierCollection = pushDocs.some((value) => value == JSON.parse(window.localStorage.getItem('USER')));
  const unsub = onSnapshot(doc(db, verifierCollection ? "client" : "agent", JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
   setPin(doc.data().pin);
  });

 }, []);


 const onSubmit = async (data) => {

  if (data.code === undefined) {

   setOpen(true);
   reset();

  } else {

   if (data.code.length != 6 || regular.test(data.code)) {
    setOpen(true);
    reset();

   } else {

    if (pin != data.code) {
     setOpen(true);
     reset();
    } else {

     window.localStorage.setItem('JqERbgU2C+G9bAiPTQfkAzPe7aN8VkOWTGczzf+d1qpUXepHaZHta9HyLDBGtHdjdrn0hlrzbmZ4lhNTA2YWOlaQehAO2RjTZcfByXpkOVCY7XnzG8aztWCybJqL+TA3', JSON.stringify(true));
     navigation('/code/update');
    }

   };

  }

 };


 return (
  <form onSubmit={handleSubmit(onSubmit)}>

   <FormControl
    sx={{ width: '100%' }}

    variant="standard">
    <InputLabel htmlFor="standard-adornment-password"><h3 className='pop-up'>Code actuel</h3></InputLabel>

    <Controller
     name="code"
     control={control}
     render={({ field }) =>

      <Input
       id="standard-adornment-password"
       inputProps={{
        autoComplete: "off", inputMode: 'numeric'
       }}
       {...field}
       autocomplete="new-password"
       type={showPassword ? 'text' : 'password'}

       endAdornment={
        <InputAdornment position="end">

         <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
         >
          {showPassword ? <VisibilityOff /> : <Visibility />}
         </IconButton>

        </InputAdornment>
       }

      />}

    />

   </FormControl>

   <Dialog
    fullWidth={fullWidth}
    maxWidth={maxWidth}
    open={open}
    onClose={handleClose}>

    <DialogTitle><h1 className='pop-up'>MuunganoMoney</h1></DialogTitle>
    <DialogContent>

     <DialogContentText>
      <p className='pop-up'>
       Code,Incorrect
      </p>
     </DialogContentText>

    </DialogContent>
    <DialogActions>
     <Button onClick={handleClose}><span className='pop-up'>Fermer</span></Button>
    </DialogActions>
   </Dialog>

   <button className='Btn'>Suivant</button>
  </form>
 );
};
