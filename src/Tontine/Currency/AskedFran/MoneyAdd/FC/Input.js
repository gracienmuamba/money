import React from 'react';
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

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import REturnPriX from './Prix';
import secureLocalStorage from "react-secure-storage";



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

 const [cdf, setCdf] = React.useState(0.00);

 const [open, setOpen] = React.useState(false);
 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');


 let prixCdf = watch('count');
 let money = prixCdf == undefined ? Number(cdf) : Number(cdf) - Number(prixCdf);

 React.useEffect(async () => {

  try {
   await onSnapshot(doc(db, "client", secureLocalStorage.getItem("USER")), (doc) => {
    setCdf(doc.data().cdf);
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

 const onSubmit = async (data) => {

  setLoad(true);
  if (data.count === undefined || data.count === '' || money < 2000) {
   setOpen(true);
   setLoad(false);
  }
  else {

   window.localStorage.setItem('**tont>>count??', JSON.stringify(data.count));
   window.console.log(data);

   window.setTimeout(() => {
    navigation('/tontine/form/info');
   }, 1000);


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

       inputProps={{
        autoComplete: "off", inputMode: 'decimal'
       }}

       id="formatted-numberformat-input"
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

    {money >= 2000 && <button className='Btn'>Avancer</button>}

   </form>
  </>
 );
};
