import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Media from 'react-media';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// Firebase Auth for phone
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';

import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';
import secureLocalStorage from "react-secure-storage";


const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
 const { onChange, ...other } = props;
 return (
  <IMaskInput
   {...other}
   mask="(#00) 000-0000"
   definitions={{
    '#': /[0-9]/,
   }}
   inputmode="tel"
   pattern="[0-9]*"

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
   inputmode="tel"
   valueIsNumericString
   prefix=""
  />
 );
});
NumericFormatCustom.propTypes = {
 name: PropTypes.string.isRequired,
 onChange: PropTypes.func.isRequired,
};

export let sendPhone = '';

// Input Field form
export default function REturnInPutCode() {
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
 <div className='wrp-form-input-sign'>
  <FormDataInput />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-form-input-sign'>
  <FormDataInput />
 </div>
);

export const FormDataInput = () => {

 let pushClient = new Array();
 let pushAgent = new Array();
 const [load, setLoad] = React.useState(false);

 const navigation = useNavigate();
 const { handleSubmit, reset, control } = useForm({});

 const [open, setOpen] = React.useState(false);
 const [some, setSome] = React.useState(false);

 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');

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
 const handleSome = () => {
  setSome(false);
 };

 const onSubmit = async (data) => {

  setLoad(true);
  if (data.phone === undefined) {

   setOpen(true);
   setLoad(false);
   reset();

  } else {

   let num = (data.phone).match(/\d+/g);
   let numPhone = '';
   num.map(index => {
    numPhone += index;
   });

   if (numPhone.length != 10 || numPhone.charAt(0) != 0) {
    setOpen(true);
    setLoad(false);
    reset();
   } else {

    const clientSnapshot = await getDocs(collection(db, "client"));
    clientSnapshot.forEach((doc) => {
     pushClient.push(doc.id);
    });

    const agentSnapshot = await getDocs(collection(db, "agent"));
    agentSnapshot.forEach((doc) => {
     pushAgent.push(doc.id);
    });

    const verifierClient = pushClient.some(value => value == numPhone);
    const verifierAgent = pushAgent.some(value => value == numPhone);

    if (verifierClient || verifierAgent) {

     if (secureLocalStorage.getItem("USER") !== numPhone) {

      sendPhone = numPhone;
      window.localStorage.setItem('A@@ph$$&-@#', JSON.stringify(numPhone));
      window.setTimeout(() => {
       navigation('/send-money');
       // navigation('/fran');
      }, 2100);

     } else {

      setLoad(false);
      setSome(true);
      reset();

     }
    } else {

     setLoad(false);
     setOpen(true);
     reset();

    };

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

    <FormControl sx={{ width: '100%' }} variant="standard">
     <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Numéro</h1></InputLabel>

     <Controller
      name="phone"
      control={control}
      render={({ field }) =>

       <Input
        autoFocus
        value={values.textmask}
        onChange={handleChange}
        inputProps={{
         autoComplete: "off", inputMode: 'tel'
        }}
        name="textmask"
        id="formatted-text-mask-input"
        inputComponent={TextMaskCustom}
        {...field}
       />

      }
     />
    </FormControl>

    <Dialog
     fullWidth={fullWidth}
     maxWidth={maxWidth}
     open={open}
     onClose={handleClose}
    >
     <DialogTitle><p className='pop-up'>MuunganoMoney</p></DialogTitle>
     <DialogContent>

      <DialogContentText>
       <p className='pop-up'>
        Le numéro de téléphone n'est pas reconnu par MuunganoMoney.
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
     open={some}
     onClose={handleSome}>
     <DialogTitle><p className='pop-up'>MuunganoMoney</p></DialogTitle>
     <DialogContent>

      <DialogContentText>
       <p className='pop-up'>
        Ce numéro ne peut pas être utilisé
       </p>
      </DialogContentText>

     </DialogContent>
     <DialogActions>
      <Button onClick={handleSome}><span className='pop-up'>Fermer</span></Button>
     </DialogActions>
    </Dialog>



    <button className='Btn'>Suivant</button>
   </form>
  </>
 );
};
