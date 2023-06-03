import React from 'react';
import './Input.css';
import REturnPriX from './Prix';
import Media from 'react-media';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Fc } from '../Money';

import { doc, getDocs, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

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



export let money = 0;
export let count = 0;
export let frais = 0;
export let solde = 0;
export let Unite = null;



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
  <div className='input-withdraw'>
   <FormInputValue />
  </div>
 );
};
export const ScreenSmall = () => {
 return (
  <div className='input-withdraw'>
   <FormInputValue />
  </div>
 )
};
export const FormInputValue = () => {

 const navigation = useNavigate();
 const { register, handleSubmit, watch, reset, control } = useForm({});
 const [prix, setPrix] = React.useState(Fc);
 const [status, setStatus] = React.useState();
 const [statusOther, setStatusOther] = React.useState();


 const [values, setValues] = React.useState({
  textmask: '(100) 000-0000',
  numberformat: '1320',
 });

 let pushUser = new Array();
 let pushOther = new Array();

 let verifierCollection = null;
 let verifierOther = null;

 let entry = watch('count');
 let value = entry == undefined ? prix : Number(prix) - Number(entry);

 const [open, setOpen] = React.useState(false);
 const [main, setMain] = React.useState(false);
 const [high, setHigh] = React.useState(false);

 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');

 const handleChange = (event) => {
  setValues({
   ...values,
   [event.target.name]: event.target.value,
  });
 };

 const handleClose = () => {
  setOpen(false);
 };
 const handleMain = () => {
  setMain(false);
 };
 const handleHigh = () => {
  setHigh(false);
 };

 if (Number(entry) <= 250000) {
  frais = remainderInput(entry, 10);
  count = doesInputEntry(entry, frais);
 }
 else if (Number(entry) > 250000 && Number(entry) <= 900000) {
  frais = remainderInput(entry, 9);
  count = count = doesInputEntry(entry, frais)
 }
 else if (Number(entry) > 900000 && Number(entry) <= 5000000) {
  frais = remainderInput(entry, 8.5);
  count = doesInputEntry(entry, frais);
 }
 else if (Number(entry) > 5000000 && Number(entry) <= 1000000000) {
  frais = remainderInput(entry, 8);
  count = doesInputEntry(entry, frais);
 }


 // else if (Number(entry) > 75000 && Number(entry) <= 125000) {
 //  frais = remainderInput(entry, 2.9);
 //  count = doesInputEntry(entry, frais);
 // }
 // else if (Number(entry) > 125000 && Number(entry) <= 250000) {
 //  frais = remainderInput(entry, 1.98);
 //  count = doesInputEntry(entry, frais);
 // }
 // else if (Number(entry) > 250000 && Number(entry) <= 1000000) {
 //  frais = remainderInput(entry, 1.7);
 //  count = doesInputEntry(entry, frais);
 // }
 // else if (Number(entry) > 1000000 && Number(entry) <= 2500000) {
 //  frais = remainderInput(entry, 1.69);
 //  count = doesInputEntry(entry, frais);
 // }
 // else if (Number(entry) > 2500000 && Number(entry) <= 4500000) {
 //  frais = remainderInput(entry, 1.6);
 //  count = doesInputEntry(entry, frais);
 // }
 // else {
 //  frais = remainderInput(entry, 1.6);
 //  count = doesInputEntry(entry, frais)
 // };




 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushUser.push(doc.id);
   pushOther.push(doc.id);
  });


  verifierCollection = pushUser.some(value => value == JSON.parse(window.localStorage.getItem('USER')));
  verifierOther = pushOther.some(value => value == JSON.parse(window.localStorage.getItem('A@@ph$$&-@#')));

  try {
   const unsub = onSnapshot(doc(db, verifierCollection ? "client" : "agent", JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
    setPrix(doc.data().cdf);
    setStatus(doc.data().state);
   });

  } catch {
   window.console.log('error');
  }

  try {
   const unsubother = onSnapshot(doc(db, verifierOther ? "client" : "agent", JSON.parse(window.localStorage.getItem('A@@ph$$&-@#'))), (doc) => {
    setStatusOther(doc.data().state);
   });

  } catch {
   window.console.log('error');
  }


 }, []);
 const prixValue = statusOther === 'client' && status === 'agent' ? Math.floor(Number(prix)) - Number(watch('count')) : Math.floor(Number(value)) - Math.floor(Number(frais));

 const onSubmit = async (data) => {

  if (data.count === undefined) {

   setOpen(true);
   reset();

  } else {

   if (Number(data.count) > Number(prix)) {
    setOpen(true);
    reset();
   }
   else if (Number(data.count) > 2000000) {
    setHigh(true);
    reset();
   }
   else if (data.count <= 2000) {
    setMain(true);
    reset();
   } else {

    money = Math.floor(Number(count));
    Unite = 'CDF'
    frais = Math.floor(Number(frais));
    solde = Math.floor(Number(data.count));

    window.localStorage.setItem('@money!#!', JSON.stringify(money))
    window.localStorage.setItem('@unite!#!', JSON.stringify(Unite))
    window.localStorage.setItem('@frais!#!', JSON.stringify(frais))
    window.localStorage.setItem('@solde!#!', JSON.stringify(solde))
    window.localStorage.setItem('@main!#!', JSON.stringify(prixValue))

    navigation('/exchange');
   }

  }

 };

 return (
  <>
   <REturnPriX count={prixValue} />
   <form onSubmit={handleSubmit(onSubmit)}>

    <Controller
     autoFocus
     name="count"
     defaultValue=''
     control={control}
     render={({ field }) =>

      <TextField
       autoFocus
       label={<h2>Montant</h2>}
       value={values.numberformat}
       onChange={handleChange}

       inputProps={{
        autoComplete: "off", inputMode: 'decimal'
       }}

       {...field}
       name="count"
       placeholder="0"
       id="formatted-numberformat-input"
       InputProps={{
        inputComponent: NumericFormatCustom,
       }}

       variant="standard"
      />

     }
    />

    <Dialog
     fullWidth={fullWidth}
     maxWidth={maxWidth}
     open={open}
     onClose={handleClose}
    >
     <DialogTitle><p className='pop-up'>MuunganoMoney</p></DialogTitle>
     <DialogContent>

      <DialogContentText>
       <p className='pop-up'>La valeur demandée n'est pas disponible, veuillez vérifier.</p>
      </DialogContentText>

     </DialogContent>
     <DialogActions>
      <Button onClick={handleClose}><span className='pop-up'>Fermer</span></Button>
     </DialogActions>
    </Dialog>

    <Dialog
     fullWidth={fullWidth}
     maxWidth={maxWidth}
     open={main}
     onClose={handleMain}
    >
     <DialogTitle><p className='pop-up'>MuunganoMoney</p></DialogTitle>
     <DialogContent>

      <DialogContentText>
       <p className='pop-up'>

        Impossible de terminer cette transaction, le solde
        principal est inférieur à 2000(CDF)
             </p>
      </DialogContentText>

     </DialogContent>
     <DialogActions>
      <Button onClick={handleMain}><span className='pop-up'>Fermer</span></Button>
     </DialogActions>
    </Dialog>

    <Dialog
     fullWidth={fullWidth}
     maxWidth={maxWidth}
     open={high}
     onClose={handleHigh}
    >
     <DialogTitle><p className='pop-up'>MuunganoMoney</p></DialogTitle>
     <DialogContent>

      <DialogContentText>
       <p className='pop-up'>

        Désolé, nous ne pouvons pas répondre à
        cette demande.Quantité supérieure à 2,000,000 (CDF)
      </p>
      </DialogContentText>

     </DialogContent>
     <DialogActions>
      <Button onClick={handleHigh}><span className='pop-up'>Fermer</span></Button>
     </DialogActions>
    </Dialog>

    <button className='Btn'>Suivant</button>
   </form>
  </>
 );
};

export const doesInputEntry = (x, y) => {
 return Math.floor(Number(x) - Number(y));
};
export const remainderInput = (entryInput, value) => {
 return Math.floor(entryInput * value) / 100;
};
