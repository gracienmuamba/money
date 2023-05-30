import React from 'react';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { doc, onSnapshot, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';

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

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';




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


let userActive = JSON.parse(window.localStorage.getItem('^^$%list++::act::'));
let userDevise = JSON.parse(window.localStorage.getItem('##!!devi&&*>>'));

let docTonAsked = JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil'));
let docTonAskedPhone = JSON.parse(window.localStorage.getItem('##!!devi --phone&&*>>'));
let listPush = JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘˚˚'));

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
 const { handleSubmit, reset, control } = useForm({});
 const [load, setLoad] = React.useState(false);

 const [pin, setPin] = React.useState(null);
 const [cdf, setCdf] = React.useState(0);
 const [usd, setUsd] = React.useState(0);

 const [rising, setRising] = React.useState(0);
 const [asked, setAsked] = React.useState(0);

 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');

 const [nothing, setNothing] = React.useState(false);
 const [open, setOpen] = React.useState(false);


 const [showPassword, setShowPassword] = React.useState(false);

 const handleClickShowPassword = () => setShowPassword((show) => !show);
 const handleMouseDownPassword = (event) => {
  event.preventDefault();
 };

 const handleClose = () => {
  setOpen(false);
 };
 const handleNothing = () => {
  setNothing(false);
 };

 React.useEffect(async () => {

  try {
   await onSnapshot(doc(db, "client", JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
    setPin(doc.data().code);
    setCdf(doc.data().cdf);
    setUsd(doc.data().usd);
   });
  } catch {
   window.console.log(`Erreur`);
  }

 }, []);
 React.useEffect(async () => {

  try {
   await onSnapshot(doc(db, "tontine", JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil'))), (doc) => {
    setRising(doc.data().rising);
    setAsked(doc.data().asked);
   });
  } catch {
   window.console.log(`Erreur`);
  }

 }, []);


 const onSubmit = async (data) => {

  setLoad(true);

  if (data.code === undefined) {
   setOpen(true);
   setLoad(false);
   reset();

  } else {

   if (data.code.length != 6 || regular.test(data.code)) {
    setOpen(true);
    setLoad(false);
    reset();

   } else {

    if (pin != data.code) {
     setOpen(true);
     setLoad(false);
     reset();
    } else {

     if (userActive) {
      if (userDevise === 'usd') {

       if (Number(parseInt(usd)) + 1 >= rising) {

        decrementMoneyClientDollar(rising);
        updateBasket(rising);
        accretionChildTon(rising);
        accretionChildTonAsked(asked);

        [...listPush].map(async (item) => {

         const washingtonRef = doc(db, JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil')), item);
         // Set the "capital" field of the city 'DC'
         if (item === JSON.parse(window.localStorage.getItem('USER'))) {
          console.log('your number');
         } else {

          window.setTimeout(async () => {
           await updateDoc(washingtonRef, {
            solde: 0
           });
          }, 500);


         }

        });

        window.setTimeout(() => {
         navigation('/tontine');
        }, 4650);

       } else {
        setLoad(false);
        setNothing(true);
       }


      } else {

       if (Number(parseInt(cdf)) + 2000 >= rising) {

        decrementMoneyClientFran(rising);
        updateBasket(rising);
        accretionChildTon(rising);
        accretionChildTonAsked(asked);

        [...listPush].map(async (item) => {

         const washingtonRef = doc(db, JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil')), item);
         // Set the "capital" field of the city 'DC'
         if (item === JSON.parse(window.localStorage.getItem('USER'))) {
          console.log('your number');
         } else {

          window.setTimeout(async () => {
           await updateDoc(washingtonRef, {
            solde: 0
           });
          }, 500);


         }

        });

        window.setTimeout(() => {
         navigation('/tontine');
        }, 4650);

       } else {
        setLoad(false);
        setNothing(true);
       }

      }

     } else {


      if (userDevise === 'usd') {

       if (Number(parseInt(usd)) + 1 >= Number(rising)) {

        decrementMoneyClientDollar(Number(rising));
        addBasket(Number(rising));
        accretionChildTon(Number(rising));

       } else {
        setNothing(true);
       }

      } else {

       if (Number(parseInt(cdf)) + 2000 >= Number(rising)) {
        decrementMoneyClientFran(Number(rising));
        addBasket(Number(rising));
        accretionChildTon(Number(rising));

        window.setTimeout(() => {
         navigation('/tontine');
        }, 1000);


       } else {
        setNothing(true);
       }

      }



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
     open={nothing}
     onClose={handleNothing}>

     <DialogTitle><h1 className='pop-up'>MuunganoMoney</h1></DialogTitle>
     <DialogContent>

      <DialogContentText>
       <p className='pop-up'>
        Votre portefeuille n'a pas le montant minimum pour cette transaction
     </p>
      </DialogContentText>

     </DialogContent>
     <DialogActions>
      <Button onClick={handleNothing}><span className='pop-up'>Fermer</span></Button>
     </DialogActions>
    </Dialog>

    <button className='Btn-Broker'>Créer</button>
   </form>

  </>
 );
};


export async function decrementMoneyClientDollar(money) {

 const washingtonRef = doc(db, "client", JSON.parse(window.localStorage.getItem('USER')));

 // Set the "capital" field of the city 'DC'
 await updateDoc(washingtonRef, {
  usd: increment(-money)
 });

};
export async function decrementMoneyClientFran(money) {

 const washingtonRef = doc(db, "client", JSON.parse(window.localStorage.getItem('USER')));

 // Set the "capital" field of the city 'DC'
 await updateDoc(washingtonRef, {
  cdf: increment(-money)
 });

};

export async function addBasket(money) {

 const washingtonRef = doc(db, "tontine", JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil')));
 // Set the "capital" field of the city 'DC'
 await updateDoc(washingtonRef, {
  asked: increment(money)
 });

};
export async function updateBasket(money) {

 const washingtonRef = doc(db, "tontine", JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil')));

 // Set the "capital" field of the city 'DC'
 await updateDoc(washingtonRef, {
  asked: (money)
 });

};

export async function accretionChildTon(rising) {

 const washingtonRef = doc(db, JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil')), JSON.parse(window.localStorage.getItem('USER')));
 let obj = { asked: 0, date: moment().format(), solde: rising }
 // Set the "capital" field of the city 'DC'
 await updateDoc(washingtonRef, {
  activity: arrayUnion(obj),
  date: moment().format(),
  solde: Number(rising),
  soldeactive: true,
 });

};
export async function IncreasewalletTon(rising) {

 const washingtonRef = doc(db, 'tontine', JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil')));

 // Set the "capital" field of the city 'DC'
 await updateDoc(washingtonRef, {
  asked: increment(rising)
 });

};
export async function accretionChildTonAsked(rising) {

 const washingtonRef = doc(db, JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil')), JSON.parse(window.localStorage.getItem('^^$%tour++::&&$$::')));
 // Set the "capital" field of the city 'DC'

 await updateDoc(washingtonRef, {
  asked: increment(Number(rising)),
 });

};


