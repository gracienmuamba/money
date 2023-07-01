import React from 'react';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import './Input.css';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import FadeLoader from 'react-spinners/FadeLoader';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm, Controller } from 'react-hook-form';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';
import FormControl from '@mui/material/FormControl';

import ReturnIMA from './IMA';
import ReturnQuoTe from '../Quote';


const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
 const { onChange, ...other } = props;
 return (
  <IMaskInput
   {...other}
   mask="0000000000"
   definitions={{
    '': /[0-9]/,
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


let pathVoda = true;
let pathAirtel = true;
let pathAfricell = true;
let pathOrange = true;


// Airtel Component 
export default function ReturnInpuT() {
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
 <div className='wrp-input-broker'>
  <ReturnQuoTe />
  <ViewInpuT />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-input-broker'>
  <ReturnQuoTe />
  <ViewInpuT />
 </div>
);
export const ViewInpuT = () => {

 const { handleSubmit, control } = useForm({});

 // Network Operator
 const [voda, setVoda] = React.useState(false);
 const [airtel, setAirtel] = React.useState(false);
 const [africell, setAfricell] = React.useState(false);
 const [orange, setOrange] = React.useState(false);

 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');

 const navigation = useNavigate();
 const [loading, setLoading] = React.useState(false);

 const inputRef = React.useRef();
 const [searchTerm, setSearchTerm] = React.useState('');

 const clearSearchString = (event) => {
  setSearchTerm('');
  inputRef.current.focus();
 }

 const [values, setValues] = React.useState({
  textmask: '1000000000',
  numberformat: '1320',
 });
 const handleChange = (event) => {
  setValues({
   ...values,
   [event.target.name]: event.target.value,
  });
 };


 // Number Valid of
 let OperaVoda = JSON.parse(window.localStorage.getItem('voda#@**__'));
 let OperaAirtel = JSON.parse(window.localStorage.getItem('airtel#@**__'));
 let OperaOrange = JSON.parse(window.localStorage.getItem('orange#@**__'));
 let OperaAfricell = JSON.parse(window.localStorage.getItem('africell#@**__'));


 const handleVoda = () => {
  setVoda(false);
 };
 const handleAirtel = () => {
  setAirtel(false);
 };
 const handleAfricell = () => {
  setAfricell(false);
 };
 const handleOrange = () => {
  setOrange(false);
 };


 const onSubmit = async (data) => {

  if (OperaVoda) {

   if (/^\d+$/.test(`${data.voda}`) && data.voda.length == 10 && (data.voda.includes('081') || data.voda.includes('082') || data.voda.includes('083'))) {

    pathVoda = true;

    let num = '0';
    let numlength = data.voda;

    for (let i = 1; i < data.voda.length; i++) {
     num += numlength[i];
    }
    window.localStorage.setItem('^^^nu**+vod&', JSON.stringify(num));

   } else {

    pathVoda = false;
    setVoda(true);
   }

  }
  if (OperaAirtel) {

   if (/^\d+$/.test(`${data.airtel}`) && data.airtel.length == 10 && (data.airtel.includes('099') || data.airtel.includes('097'))) {

    pathAirtel = true;
    let num = '0';
    let numlength = data.airtel;

    for (let i = 1; i < data.airtel.length; i++) {
     num += numlength[i];
    }
    window.localStorage.setItem('^^^nu**+air&', JSON.stringify(num));

   } else {


    pathAirtel = false;
    setAirtel(true);
   }
  }
  if (OperaOrange) {

   if (/^\d+$/.test(`${data.orange}`) && data.orange.length == 10 && (data.orange.includes('084') || data.orange.includes('085') || data.orange.includes('089') || data.orange.includes('080'))) {

    pathOrange = true;
    let num = '0';
    let numlength = data.orange;

    for (let i = 1; i < data.orange.length; i++) {
     num += numlength[i];
    }
    window.localStorage.setItem('^^^nu**+oran&', JSON.stringify(num));
   } else {
    pathOrange = false;
    setOrange(true);
   }


  }
  if (OperaAfricell) {

   if (/^\d+$/.test(`${data.africell}`) && data.africell.length == 10 && (data.africell.includes('091') || data.africell.includes('090'))) {

    pathAfricell = true;
    let num = '0';
    let numlength = data.africell;

    for (let i = 1; i < data.africell.length; i++) {
     num += numlength[i];
    }
    window.localStorage.setItem('^^^nu**+afri&', JSON.stringify(num));
   } else {

    pathAfricell = false;
    setAfricell(true);
   }

  }

  if (pathVoda == true && pathAirtel == true && pathOrange == true && pathAfricell == true) {
   navigation('/brokers/unite/prix');


   window.localStorage.setItem('@!access%voda', JSON.stringify(false));
   window.localStorage.setItem('@!access%airtel', JSON.stringify(false));
   window.localStorage.setItem('@!access%orange', JSON.stringify(false));
   window.localStorage.setItem('@!access%africell', JSON.stringify(false));

  }


 };

 return (
  <>
   {loading && <div className='App-Icon'>
    <FadeLoader
     size={15}
     color={'#00b8d4'}
     loading={loading}
    />
   </div>}

   <form onSubmit={handleSubmit(onSubmit)}>

    {OperaVoda &&
     <FormControl sx={{ width: '100%' }} variant="standard">

      <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Vodacom</h1></InputLabel>
      <Controller
       name="voda"
       control={control}
       render={({ field }) =>

        <Input
         value={values.textmask}
         onChange={handleChange}
         inputRef={inputRef}
         onChange={(e) => setSearchTerm(e.target.value)}

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
    }

    {OperaAirtel &&
     <FormControl sx={{ width: '100%' }} variant="standard">

      <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Airtel</h1></InputLabel>
      <Controller
       name="airtel"
       control={control}
       render={({ field }) =>

        <Input
         value={values.textmask}
         onChange={handleChange}
         inputRef={inputRef}
         onChange={(e) => setSearchTerm(e.target.value)}

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

    }

    {OperaOrange &&
     <FormControl sx={{ width: '100%' }} variant="standard">

      <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Orange</h1></InputLabel>
      <Controller
       name="orange"
       control={control}
       render={({ field }) =>

        <Input
         value={values.textmask}
         onChange={handleChange}
         inputRef={inputRef}
         onChange={(e) => setSearchTerm(e.target.value)}

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

    }

    {OperaAfricell &&
     <FormControl sx={{ width: '100%' }} variant="standard">

      <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Africell</h1></InputLabel>
      <Controller
       name="africell"
       control={control}
       render={({ field }) =>

        <Input
         value={values.textmask}
         onChange={handleChange}
         inputRef={inputRef}
         onChange={(e) => setSearchTerm(e.target.value)}

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

    }

    <button className='Btn-Broker'>Suivant</button>

    <Dialog
     fullWidth={fullWidth}
     maxWidth={maxWidth}
     open={voda}
     onClose={handleVoda}>

     <DialogTitle><h1 className='pop-up'>MuunganoMoney</h1></DialogTitle>
     <DialogContent>

      <DialogContentText>
       <p className='pop-up'>
        Veuillez vérifier le numéro de téléphone Vodacom s'il vous plaît
      </p>
      </DialogContentText>

     </DialogContent>
     <DialogActions>
      <Button onClick={handleVoda}><span className='pop-up'>Fermer</span></Button>
     </DialogActions>
    </Dialog>

    <Dialog
     fullWidth={fullWidth}
     maxWidth={maxWidth}
     open={airtel}
     onClose={handleAirtel}>

     <DialogTitle><h1 className='pop-up'>MuunganoMoney</h1></DialogTitle>
     <DialogContent>

      <DialogContentText>

       <p className='pop-up'>
        Veuillez vérifier le numéro de téléphone Airtel s'il vous plaît
      </p>

      </DialogContentText>

     </DialogContent>
     <DialogActions>
      <Button onClick={handleAirtel}><span className='pop-up'>Fermer</span></Button>
     </DialogActions>
    </Dialog>

    <Dialog
     fullWidth={fullWidth}
     maxWidth={maxWidth}
     open={africell}
     onClose={handleAfricell}>

     <DialogTitle><h1 className='pop-up'>MuunganoMoney</h1></DialogTitle>
     <DialogContent>

      <DialogContentText>
       <p className='pop-up'>
        Veuillez vérifier le numéro de téléphone Africell s'il vous plaît
      </p>
      </DialogContentText>

     </DialogContent>
     <DialogActions>
      <Button onClick={handleAfricell}><span className='pop-up'>Fermer</span></Button>
     </DialogActions>
    </Dialog>

    <Dialog
     fullWidth={fullWidth}
     maxWidth={maxWidth}
     open={orange}
     onClose={handleOrange}>

     <DialogTitle><h1 className='pop-up'>MuunganoMoney</h1></DialogTitle>
     <DialogContent>

      <DialogContentText>

       <p className='pop-up'>
        Veuillez vérifier le numéro de téléphone Orange s'il vous plaît
      </p>

      </DialogContentText>

     </DialogContent>
     <DialogActions>
      <Button onClick={handleOrange}><span className='pop-up'>Fermer</span></Button>
     </DialogActions>
    </Dialog>

   </form>
  </>
 )
};