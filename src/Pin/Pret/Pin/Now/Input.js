import React from 'react';
import './Input.css';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { doc, onSnapshot, updateDoc, increment, arrayUnion, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase';

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
import moment from 'moment';
import secureLocalStorage from "react-secure-storage";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



let pushDoc = new Array();


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

 let regular = /[a-z]+/;

 const navigation = useNavigate();

 const [open, setOpen] = React.useState(false);
 const [high, setHigh] = React.useState(false);

 const { handleSubmit, reset, control } = useForm();
 const [pin, setPin] = React.useState(null);
 const [load, setLoad] = React.useState(false);

 const [current, setCurrent] = React.useState(0);

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
 const handleHigh = () => {
  setHigh(false);
 };


 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   pushDoc.push(doc.id);
  });

  if (pushDoc.includes(secureLocalStorage.getItem("A@@ph$$&-@#"))) {

   const unsub = onSnapshot(doc(db, "pret", secureLocalStorage.getItem("A@@ph$$&-@#")), (doc) => {
    setCurrent(doc.data().cdf);
   });

  }

 }, [])
 React.useEffect(async () => {

  try {
   await onSnapshot(doc(db, "agent", secureLocalStorage.getItem("USER")), (doc) => {
    setPin(doc.data().code);
   });
  } catch {
   window.console.log(`Erreur`);
  }

 }, []);

 const onSubmit = async (data) => {

  setLoad(true);

  if (data.code === undefined || Number(current) <= 0) {
   setLoad(false);
   setOpen(true);
   reset();

  } else {

   if (data.code.length != 6 || regular.test(data.code)) {
    setLoad(false);
    setOpen(true);
    reset();

   } else {

    if (pin != data.code) {

     setLoad(false);
     setOpen(true);

     reset();
    } else {

     if (Number(secureLocalStorage.getItem("@solde!#!")) >= parseInt(Number(current)) + 1000) {

      setHigh(true);
      setLoad(false);

     }
     else if ((parseInt(Number(current)) - Number(secureLocalStorage.getItem("@solde!#!"))) <= 1000) {

      setHigh(true);
      setLoad(false);

     }
     else {

      secureLocalStorage.setItem("&&837$$prnt@*#())", false);
      window.localStorage.setItem('@dateª©#&&++#', JSON.stringify(moment().format('LLLL')));
      let soldepret = secureLocalStorage.getItem("@solde!#!");

      asKedpret(secureLocalStorage.getItem("@solde!#!"));
      asKedDecrimentpret(secureLocalStorage.getItem("@solde!#!"));

      let pretInfo = 'pret' + secureLocalStorage.getItem("A@@ph$$&-@#");
      collectionPret(pretInfo, moment().format(), parseInt(Number(current) - Number(soldepret)), Number(current), Number(soldepret));

      window.setTimeout(() => {
       navigation('/well/refunded/franc');
      }, 2500);


     }

    }

   };

  }

 };

 return (
  <>
   <div className='zindex-theme'>
    <Backdrop
     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
     open={load}>

     <CircularProgress color="inherit" />
    </Backdrop>
   </div>

   <form onSubmit={handleSubmit(onSubmit)}>

    <FormControl
     sx={{ width: '100%' }}

     variant="standard">
     <InputLabel htmlFor="standard-adornment-password"><span className='pop-up'>Pin actuel</span></InputLabel>

     <Controller
      name="code"
      control={control}
      render={({ field }) =>

       <Input
        id="standard-adornment-password"
        {...field}
        type={showPassword ? 'numeric' : 'password'}
        inputProps={{
         autoComplete: "off", inputMode: 'numeric'
        }}

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
        Code pin Incorrect
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
     open={high}
     onClose={handleHigh}>

     <DialogTitle><h1 className='pop-up'>MuunganoMoney</h1></DialogTitle>
     <DialogContent>

      <DialogContentText>
       <p className='pop-up'>

        La finalisation du prêt ne peut être effectuée par un mandataire.
        Contactez MuunganoMoney pour plus d'informations. Merci

     </p>
      </DialogContentText>

     </DialogContent>
     <DialogActions>
      <Button onClick={handleHigh}><span className='pop-up'>Fermer</span></Button>
     </DialogActions>
    </Dialog>

    <button className='Btn-Broker'>Envoi</button>
   </form>

  </>
 );
};


// Add pret for client
export async function asKedpret(prix) {
 const washingtonRef = doc(db, "pret", secureLocalStorage.getItem("A@@ph$$&-@#"));

 // Set the "capital" field of the city 'DC'
 await updateDoc(washingtonRef, {
  cdf: increment(-prix),
  pretcdf: increment(-prix),
  date: moment().format()
 });

};
// add pret for client
export async function asKedpretpart(prix) {
 const washingtonRef = doc(db, "pret", secureLocalStorage.getItem("A@@ph$$&-@#"));

 // Set the "capital" field of the city 'DC'
 await updateDoc(washingtonRef, {
  cdf: prix,
  pretcdf: prix,
  date: moment().format()
 });

};
export async function asKedDecrimentpret(prix) {

 const washingtonRef = doc(db, "agent", secureLocalStorage.getItem("USER"));
 // Set the "capital" field of the city 'DC'
 await updateDoc(washingtonRef, {
  cdf: increment(-prix)
 });

};
// add pret for client active
export async function asKedpretActive() {
 const washingtonRef = doc(db, "client", secureLocalStorage.getItem("A@@ph$$&-@#"));
 // Set the "capital" field of the city 'DC'
 await updateDoc(washingtonRef, {
  pret: false,
  pretactive: false,
  pretregister: false
 });

};
// view pret 
export async function collectionPret(userCollection, userDocs, current, pret, reimburse) {

 let obj = { pret: pret, reimburse: reimburse, current: current, devise: 'CDF' };
 await setDoc(doc(db, userCollection, userDocs), { date: moment().format(), data: arrayUnion(obj), devise: false }, { merge: true });

};

