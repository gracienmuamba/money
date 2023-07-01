import React from 'react';
import './Input.css';
import Media from 'react-media';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { doc, onSnapshot, } from "firebase/firestore";
import { db } from '../../../../../firebase';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';
import TextField from '@mui/material/TextField';
import secureLocalStorage from "react-secure-storage";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import REturnPriX from './Prix';



const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
 const { onChange, ...other } = props;
 return (
  <IMaskInput
   {...other}
   mask="(#00) 000-0000"
   definitions={{
    '#': /[1-9]/,
   }}
   inputRef={ref}
   onAccept={(value) => onChange({ target: { name: props.name, value } })}
   overwrite
  />
 );
});
TextMaskCustom.propTypes = {
 name: PropTypes.string.isRequired,
 onChange: PropTypes.func.isRequired,
};
const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
 props,
 ref,
) {
 const { onChange, ...other } = props;

 return (
  <NumericFormat
   {...other}
   getInputRef={ref}
   onValueChange={(values) => {
    onChange({
     target: {
      name: props.name,
      value: values.value,
     },
    });
   }}
   thousandSeparator
   valueIsNumericString
   prefix=""
  />
 );
});
NumericFormatCustom.propTypes = {
 name: PropTypes.string.isRequired,
 onChange: PropTypes.func.isRequired,
};




// Return Phone input component
export default function REturnInputPhone() {
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
  <div className='solde-input-asked'>
   <FormInputValue />
  </div>
 );
};
export const ScreenSmall = () => {
 return (
  <div className='solde-input-asked'>
   <FormInputValue />
  </div>
 )
};
export const FormInputValue = () => {

 const navigation = useNavigate();
 const { handleSubmit, control, watch } = useForm({});
 const [load, setLoad] = React.useState(false);

 const [usd, setUsd] = React.useState(0.00);
 const [open, setOpen] = React.useState(false);
 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');


 let moneyPret = JSON.parse(window.localStorage.getItem('&&money::pret__'));
 let prixUsd = watch('count');

 React.useEffect(async () => {

  try {
   await onSnapshot(doc(db, "client", secureLocalStorage.getItem("USER")), (doc) => {
    setUsd(doc.data().usd);
   });
  } catch {
   window.console.log(`Erreur`);
  }

 }, []);

 const [values, setValues] = React.useState({
  textmask: '(100) 000-0000',
  numberformat: '1320',
 });

 const handleChange = (event) => {
  setValues({
   ...values,
   [event.target.name]: event.target.value,
  });
 };
 const handleClose = () => {
  setOpen(false);
 };


 let money = prixUsd == undefined ? Number(usd) : Number(usd) - Number(prixUsd);
 let value = prixUsd == undefined ? prixUsd : Number(moneyPret) - Number(prixUsd);

 const onSubmit = async (data) => {

  // setLoad(true);
  if (data.count === undefined || data.count === '' || data.count <= (moneyPret * 0.5) / 100) {
   setOpen(true);
   setLoad(false);
  } else {

   if (Number(data.count) > Number(usd)) {
    setOpen(true);
    setLoad(false);

   } else if (Number(data.count) > Number(moneyPret)) {

    setOpen(true);
    setLoad(false);

   }

   else {

    window.localStorage.setItem('^^pret->value', JSON.stringify(Number(value)));
    window.localStorage.setItem('^^pret->count', JSON.stringify(Number(data.count)));
    window.localStorage.setItem('^^pret->part', JSON.stringify(true));


    let before = parseInt(moneyPret);
    let after = moneyPret.toFixed(3);

    let str = (after).toString();
    let index = str.lastIndexOf(".");
    after = str.slice(index + 1);
    after = ((after).toString()).slice(0, 2);

    before = Number(before) - prixUsd;
    if (before <= 0 && after > 1) {

     setOpen(true);
     setLoad(false);
     window.console.log(true);
    } else {

     window.console.log(false);
     window.setTimeout(() => {
      navigation('/pret/pin/dollar');
     }, 200);
    }


   }
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

   <REturnPriX count={money} />
   <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>

    <Controller
     name="count"
     control={control}
     render={({ field }) =>

      <TextField
       label={<h2>Montant</h2>}
       value={values.numberformat}
       onChange={handleChange}
       {...field}
       name="count"
       id="formatted-numberformat-input"

       inputProps={{
        autoComplete: "off", inputMode: 'decimal'
       }}

       InputProps={{
        inputComponent: NumericFormatCustom,
       }}
       variant="standard"
       placeholder='0'
      />

     }
    />

    <Dialog
     fullWidth={fullWidth}
     maxWidth={maxWidth}
     open={open}
     onClose={handleClose}>
     <DialogTitle><span className='pop-up'>MuunganoMoney</span></DialogTitle>
     <DialogContent>

      <DialogContentText>
       <p className='pop-up'>
        La valeur demandée n'est pas disponible, veuillez vérifier.
      </p>

      </DialogContentText>

     </DialogContent>
     <DialogActions>
      <Button onClick={handleClose}><span className='pop-up'>Fermer</span></Button>
     </DialogActions>
    </Dialog>

    <button className='Btn'>Suivant</button>
   </form>
  </>
 );
};
