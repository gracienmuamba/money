import React from 'react';
import './Input.css';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { collection, getDocs, doc, onSnapshot, updateDoc, increment, arrayUnion, setDoc } from 'firebase/firestore';
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
import moment from 'moment';

import secureLocalStorage from "react-secure-storage";

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
 const { handleSubmit, reset, control } = useForm();
 const [pin, setPin] = React.useState(null);

 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');
 const [open, setOpen] = React.useState(false);
 const [showPassword, setShowPassword] = React.useState(false);
 const [status, setStatus] = React.useState(null);

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

  const verifierCollection = pushDocs.some((value) => value == secureLocalStorage.getItem("USER"));
  const unsub = onSnapshot(doc(db, verifierCollection ? "client" : "agent", secureLocalStorage.getItem("USER")), (doc) => {
   setPin(doc.data().code);
   setStatus(doc.data().state);
  });

 }, []);

 // Number Valid of
 let OperaVoda = JSON.parse(window.localStorage.getItem('voda#@**__'));
 let OperaAirtel = JSON.parse(window.localStorage.getItem('airtel#@**__'));
 let OperaOrange = JSON.parse(window.localStorage.getItem('orange#@**__'));
 let OperaAfricell = JSON.parse(window.localStorage.getItem('africell#@**__'));


 let moneyVoda = JSON.parse(window.localStorage.getItem('@!money%voda'));
 let moneyAirtel = JSON.parse(window.localStorage.getItem('@!money%airtel'));
 let moneyOrange = JSON.parse(window.localStorage.getItem('@!money%orange'));
 let moneyAfricell = JSON.parse(window.localStorage.getItem('@!money%africell'));


 let UniteVoda = JSON.parse(window.localStorage.getItem('@!unite%voda'));
 let UniteAirtel = JSON.parse(window.localStorage.getItem('@!unite%airtel'));
 let UniteOrange = JSON.parse(window.localStorage.getItem('@!unite%orange'));
 let UniteAfricell = JSON.parse(window.localStorage.getItem('@!unite%africell'));


 // get phone number 
 let numVoda = JSON.parse(window.localStorage.getItem('^^^nu**+vod&'));
 let phoneAirtel = JSON.parse(window.localStorage.getItem('^^^nu**+air&'));
 let phoneOrange = JSON.parse(window.localStorage.getItem('^^^nu**+oran&'));
 let phoneAfricell = JSON.parse(window.localStorage.getItem('^^^nu**+afri&'));



 // ID collections
 let fiatColl = secureLocalStorage.getItem("USER");


 const onSubmit = async (data) => {

  let nowDocs = moment().format();

  let dataCollection = fiatColl;
  dataCollection = 'unite' + dataCollection;


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

     if (OperaVoda) {

      if (JSON.parse(window.localStorage.getItem('@!access%devise'))) {

       let vodaObj = { money: moneyVoda, devise: 'USD', unite: parseInt(UniteVoda), date: moment().format(), phone: numVoda }
       buyUsd(moneyVoda, status);
       getDocsView(dataCollection, nowDocs, vodaObj);

      } else {

       let vodaObj = { money: moneyVoda, devise: 'CDF', unite: parseInt(UniteVoda), date: moment().format(), phone: numVoda }

       buyCdf(moneyVoda, status);
       getDocsView(dataCollection, nowDocs, vodaObj);

      }


     }
     if (OperaAirtel) {

      if (JSON.parse(window.localStorage.getItem('@!access%devise'))) {

       const unite = Number(moneyAirtel) * 100;
       let airtelObj = { money: moneyAirtel, devise: 'USD', unite: parseInt(UniteAirtel), date: moment().format(), phone: phoneAirtel }

       buyUsd(moneyAirtel, status);
       getDocsView(dataCollection, nowDocs, airtelObj);

      } else {

       const unite = Number(moneyAirtel) / 27;
       let airtelObj = { money: moneyAirtel, devise: 'CDF', unite: parseInt(UniteAirtel), date: moment().format(), phone: phoneAirtel }

       buyCdf(moneyAirtel, status);
       getDocsView(dataCollection, nowDocs, airtelObj);
      }

     }
     if (OperaOrange) {

      if (JSON.parse(window.localStorage.getItem('@!access%devise'))) {

       const unite = Number(moneyOrange) * 100;
       let orangeObj = { money: moneyOrange, devise: 'USD', unite: parseInt(UniteOrange), date: moment().format(), phone: phoneOrange }

       buyUsd(moneyOrange, status);
       getDocsView(dataCollection, nowDocs, orangeObj);

      } else {

       const unite = Number(moneyOrange) / 27;
       let orangeObj = { money: moneyOrange, devise: 'CDF', unite: parseInt(UniteOrange), date: moment().format(), phone: phoneOrange }

       buyCdf(moneyOrange, status);
       getDocsView(dataCollection, nowDocs, orangeObj);


      }

     }
     if (OperaAfricell) {

      if (JSON.parse(window.localStorage.getItem('@!access%devise'))) {

       const unite = Number(moneyAfricell) * 100;
       let africellObj = { money: moneyAfricell, devise: 'USD', unite: parseInt(UniteAfricell), date: moment().format(), phone: phoneAfricell }

       buyUsd(moneyAfricell, status);
       getDocsView(dataCollection, nowDocs, africellObj);

      } else {

       const unite = Number(moneyAfricell) / 27;
       let africellObj = { money: moneyAfricell, devise: 'CDF', unite: parseInt(UniteAfricell), date: moment().format(), phone: phoneAfricell }

       buyCdf(moneyAfricell, status);
       getDocsView(dataCollection, nowDocs, africellObj);

      }

     }

     window.localStorage.setItem('@!money%voda', JSON.stringify(0));
     window.localStorage.setItem('@!money%voda', JSON.stringify(0));
     window.localStorage.setItem('@!money%voda', JSON.stringify(0));
     window.localStorage.setItem('@!money%voda', JSON.stringify(0));

     updateTimeTransaction(dataCollection, nowDocs)
     window.localStorage.setItem('^*$#path**', false);
     navigation('/brokers/unite/thank');


    }

   };

  }

 };

 return (
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

   <button className='Btn'>Envoi</button>
  </form>
 );
};


export async function buyCdf(prix, collections) {

 const washingtonRef = doc(db, collections, secureLocalStorage.getItem("USER"));

 // Set the "capital" field of the city 'DC'
 await updateDoc(washingtonRef, {
  cdf: increment(-(prix))
 });
};
export async function buyUsd(prix, collections) {

 const washingtonRef = doc(db, collections, secureLocalStorage.getItem("USER"));

 // Set the "capital" field of the city 'DC'
 await updateDoc(washingtonRef, {
  usd: increment(-(prix)),
 });

};
export async function creditUnion(creditprice, creditdevise, creditunite, time, collections) {

 let unite = { status: false, price: creditprice, devise: creditdevise, unite: creditunite, date: time }
 let source = { a: 1, b: 2 }

 const washingtonRef = doc(db, collections, secureLocalStorage.getItem("USER"));
 // Set the "capital" field of the city 'DC'
 await updateDoc(washingtonRef, {
  credit: arrayUnion(source),
 });

};
export async function getDocsView(col, fiatDocs, data) {
 await setDoc(doc(db, col, fiatDocs), { date: moment().format(), data: arrayUnion(data) }, { merge: true });
};
export async function updateTimeTransaction(userCollection, userDocs) {
 await setDoc(doc(db, userCollection, userDocs), { date: moment().format() }, { merge: true });
};
