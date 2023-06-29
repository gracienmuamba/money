import React from 'react';
import Media from 'react-media';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { collection, getDocs, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { reactLocalStorage } from 'reactjs-localstorage';



let pushDocs = new Array();


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

 const navigation = useNavigate();
 const { handleSubmit, control, reset, watch } = useForm({});

 const [open, setOpen] = React.useState(false);
 const [exist, setExist] = React.useState(false);


 const [load, setLoad] = React.useState(false);
 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');

 const [firstChart, setFirstChart] = React.useState(false);
 const [checked, setChecked] = React.useState(false);
 const [showPassword, setShowPassword] = React.useState(false);

 const [access, setAccess] = React.useState('');


 const handleClickShowPassword = () => setShowPassword((show) => !show);
 const handleMouseDownPassword = (event) => {
  event.preventDefault();
 };

 const handleClose = () => {
  setOpen(false);
 };
 const handleExist = () => {
  setExist(false);
 };

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  const unsub = onSnapshot(doc(db, pushDocs.includes(JSON.parse(window.localStorage.getItem('USER'))) ? "client" : "agent", JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
   setAccess(doc.data().pin);
  });
 }, []);

 React.useEffect(() => {

  const subscription = watch((data) => {

   if (/^\d+$/.test(`${data.first}`) && data.first.length <= 6) {
    setFirstChart(false);
   } else {
    setFirstChart(true);
   }

   if (data.first != data.second) {
    setChecked(true);
   } else {
    setChecked(false);
   }

  });

  return () => {
   subscription.unsubscribe();
  }

 }, [watch]);

 window.console.log(access);

 const onSubmitPwd = async (data) => {

  setLoad(true);

  if (data.first != data.second || data.first == '123456' || !(/^\d+$/.test(`${data.first}`)) || data.first.length != 6 || data.first == '000000' || data.first == '111111' || data.first == '222222' || data.first == '333333' || data.first == '444444' || data.first == '555555' || data.first == '666666' || data.first == '777777' || data.first == '888888' || data.first == '999999') {

   setOpen(true);
   setLoad(false);
   reset();

  } else {

   if (access === data.first) {


    window.setTimeout(() => {

     setExist(true);
     setLoad(false);

    }, 850);

   }
   else if (access === data.first) {
    window.setTimeout(() => {

     setExist(true);
     setLoad(false);

    }, 850);

   } else {

    const verifierCollection = pushDocs.some((value) => value == JSON.parse(window.localStorage.getItem('USER')));
    updatePinInWithDocs(verifierCollection, data.first, JSON.parse(window.localStorage.getItem('USER')));
    reactLocalStorage.remove('JqERbgU2C+G9bAiPTQfkAzPe7aN8VkOWTGczzf+d1qpUXepHaZHta9HyLDBGtHdjdrn0hlrzbmZ4lhNTA2YWOlaQehAO2RjTZcfByXpkOVCY7XnzG8aztWCybJqL+TA3');

    window.setTimeout(() => {
     navigation('/pin/success');
    }, 3450);

   }

  };

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

   <form
    autoComplete='off'
    onSubmit={handleSubmit(onSubmitPwd)}>

    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

     <FormControl
      sx={{ width: '100%' }}

      variant="standard">
      <InputLabel htmlFor="standard-adornment-password pop-up"><span className='pop-up'>Nouveau code</span></InputLabel>

      <Controller
       name="first"
       control={control}
       render={({ field }) =>

        <Input
         id="standard-adornment-password"
         autocomplete="new-password"
         inputProps={{
          autoComplete: "off", inputMode: 'numeric'
         }}

         {...field}
         type={showPassword ? 'numeric' : 'password'}

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

     {firstChart && <p className='wrp-errors-code pop-up'>Seul caractère numérique, a 6 chiffre sont valides</p>}
     <p className='wrp-errors-code-transparent pop-up'>Seul caractère numérique</p>
    </Box>

    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

     <FormControl
      sx={{ width: '100%' }}

      variant="standard">
      <InputLabel htmlFor="standard-adornment-password pop-up"><span className='pop-up'>Confirmer le nouveau code</span></InputLabel>

      <Controller
       name="second"
       control={control}
       render={({ field }) =>

        <Input
         id="standard-adornment-password"
         inputProps={{
          autoComplete: "off", inputMode: 'numeric'
         }}


         {...field}
         type={showPassword ? 'numeric' : 'password'}

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

     {checked && <p className='wrp-errors-code pop-up'>Les codes sont différents vérifier</p>}
     <p className='wrp-errors-code-transparent pop-up'>Seul caractère numérique</p>
    </Box>


    <Dialog
     fullWidth={fullWidth}
     maxWidth={maxWidth}
     open={open}
     onClose={handleClose}>

     <DialogTitle><h1 className='pop-up'>MuunganoMoney</h1></DialogTitle>
     <DialogContent>

      <DialogContentText>
       <p className='pop-up'>
        Le code saisi est valide avec six chiffres numériques.
        Évitez les valeurs identiques en caractères.
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
     open={exist}
     onClose={handleExist}>

     <DialogTitle><h1 className='pop-up'>MuunganoMoney</h1></DialogTitle>
     <DialogContent>

      <DialogContentText>
       <p className='pop-up'>
        Ce code est déjà utilisé, contactez MuunganoMoney pour plus d'informations.
      </p>
      </DialogContentText>

     </DialogContent>
     <DialogActions>
      <Button onClick={handleExist}><span className='pop-up'>Fermer</span></Button>
     </DialogActions>
    </Dialog>

    <button className='Btn'>Valider</button>
   </form>

  </>
 );
};

async function updatePinInWithDocs(verifierCollection, newPin, numPhone) {

 const washingtonRef = doc(db, verifierCollection ? "client" : "agent", numPhone);
 // Set the "capital" field of the city 'DC'
 await updateDoc(washingtonRef, { code: newPin });
};
