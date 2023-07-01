import React from 'react';
import './Input.css';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import ReturnIMA from './IMA';
import FadeLoader from 'react-spinners/FadeLoader';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { doc, getDocs, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';
import Switch from '@mui/material/Switch';
import ReturnDevise from './Devise';

import secureLocalStorage from "react-secure-storage";



let pushDocs = new Array();


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
 <div className='wrp-input-broker-prixs'>
  <ViewInpuT />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-input-broker-prixs'>
  <ViewInpuT />
 </div>
);
export const ViewInpuT = () => {

 const { handleSubmit, control, watch } = useForm({});

 const navigation = useNavigate();
 const [loading, setLoading] = React.useState(false);
 const [cdf, setCdf] = React.useState(0);
 const [usd, setUsd] = React.useState(0);

 const [dialog, setDialog] = React.useState(false);
 const [scroll, setScroll] = React.useState('paper');

 const [status, setStatus] = React.useState(null);
 const [team, setTeam] = React.useState(null);


 const handleClickDialog = (scrollType) => () => {
  setDialog(true);
  setScroll(scrollType);
 };
 const dialogClose = () => {
  setDialog(false);
 };
 const dialogConfirm = () => {

  window.console.log('unite simple');
  // navigation('/brokers/unite/pin');
  // window.localStorage.setItem('^*$#path**', JSON.stringify(true));

 };


 const descriptionElementRef = React.useRef(null);
 React.useEffect(() => {
  if (dialog) {
   const { current: descriptionElement } = descriptionElementRef;
   if (descriptionElement !== null) {
    descriptionElement.focus();
   }
  }
 }, [dialog]);

 const [open, setOpen] = React.useState(false);

 // Network Operator

 const [voda, setVoda] = React.useState(false);
 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');
 const [checked, setChecked] = React.useState(true);

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

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  const verifierCollection = pushDocs.some(value => value == secureLocalStorage.getItem("USER"));

  try {
   const unsub = onSnapshot(doc(db, verifierCollection ? "client" : "agent", secureLocalStorage.getItem("USER")), (doc) => {
    setCdf(doc.data().cdf);
    setUsd(doc.data().usd);
    setStatus(doc.data().state);
    setTeam(doc.data().team);
   });

  } catch {
   window.console.log('error');
  }

 }, []);


 let cdfnumber = cdf;
 let usdnumber = usd;

 // Opearator
 let UniteVodA = 0;
 let UniteAirtel = 0;
 let UniteOrange = 0;
 let UniteAfricell = 0;


 // Number Valid of
 let OperaVoda = JSON.parse(window.localStorage.getItem('voda#@**__'));
 let OperaAirtel = JSON.parse(window.localStorage.getItem('airtel#@**__'));
 let OperaOrange = JSON.parse(window.localStorage.getItem('orange#@**__'));
 let OperaAfricell = JSON.parse(window.localStorage.getItem('africell#@**__'));


 // Access
 let Operator = Number(OperaVoda) + Number(OperaAirtel) + Number(OperaOrange) + Number(OperaAfricell)


 // View Vodacom
 if (checked) {
  if (watch('voda') === undefined) {
   usdnumber += 0;
  } else {

   if (status === 'client' || team === 'mere') {
    usdnumber -= watch('voda');
    UniteVodA = Number(watch('voda')) * 100;

   } else {
    usdnumber -= watch('voda');
    UniteVodA = Number(watch('voda')) / 0.0096;

   }

  }

 } else {

  if (watch('voda') === undefined) {
   cdfnumber += 0;
  } else {

   if (status === 'client' || team === 'mere') {
    cdfnumber -= watch('voda');
    UniteVodA = Number(watch('voda')) / 27;

   } else {
    cdfnumber -= watch('voda');
    UniteVodA = Number(watch('voda')) / 22.1;

   }

  }

 }

 // View Airtel
 if (checked) {
  if (watch('airtel') === undefined) {
   usdnumber += 0;
  } else {

   if (status === 'client' || team === 'mere') {
    usdnumber -= watch('airtel');
    UniteAirtel = Number(watch('airtel')) * 100;

   } else {

    usdnumber -= watch('airtel');
    UniteAirtel = Number(watch('airtel')) / 0.00955;

   }

  }

 } else {

  if (watch('airtel') === undefined) {
   cdfnumber += 0;
  } else {

   if (status === 'client' || team === 'mere') {
    cdfnumber -= watch('airtel');
    UniteAirtel = Number(watch('airtel')) / 27;

   } else {
    cdfnumber -= watch('airtel');
    UniteAirtel = Number(watch('airtel')) / 22;

   }


  }

 }

 // View Orange
 if (checked) {
  if (watch('orange') === undefined) {
   usdnumber += 0;
  } else {

   if (status === 'client' || team === 'mere') {
    usdnumber -= watch('orange');
    UniteOrange = Number(watch('orange')) * 100;

   } else {

    usdnumber -= watch('orange');
    UniteOrange = Number(watch('orange')) / 0.0096;

   }


  }

 } else {

  if (watch('orange') === undefined) {
   cdfnumber += 0;
  } else {

   if (status === 'client' || team === 'mere') {
    cdfnumber -= watch('orange');
    UniteOrange = Number(watch('orange')) / 27;
   } else {
    cdfnumber -= watch('orange');
    UniteOrange = Number(watch('orange')) / 22.1;

   }
  }

 }


 // View Africell
 if (checked) {
  if (watch('africell') === undefined) {
   usdnumber += 0;
  } else {

   if (status === 'client' || team === 'mere') {
    usdnumber -= watch('africell');
    UniteAfricell = Number(watch('africell')) * 100;
   } else {

    usdnumber -= watch('africell');
    UniteAfricell = Number(watch('africell')) / 0.00955;
   }




  }

 } else {

  if (watch('africell') === undefined) {
   cdfnumber += 0;
  } else {

   if (status === 'client' || team === 'mere') {
    cdfnumber -= watch('africell');
    UniteAfricell = Number(watch('africell')) / 27;
   } else {

    cdfnumber -= watch('africell');
    UniteAfricell = Number(watch('africell')) / 22;

   }

  }

 }

 const handleChangeSwitch = (event) => {
  setChecked(event.target.checked);
 };

 const handleClose = () => {
  setOpen(false);
 };


 const handleVoda = () => {
  setVoda(false);
 };

 let value = 0;

 if (checked) {
  value = usdnumber

 } else {
  value = cdfnumber
 }


 let colorUsd = usdnumber <= 1 ? '#e6e8e6' : '#1a659e';
 let colorCdf = cdfnumber <= 2000 ? '#e6e8e6' : '#1a659e';

 usdnumber = (usdnumber).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ');
 cdfnumber = (cdfnumber).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ');

 const onSubmit = async (data) => {

  window.localStorage.setItem('@!access%devise', JSON.stringify(checked));

  if (OperaVoda) {

   if (/^\d+$/.test(`${(data.voda)}`)) {

    window.localStorage.setItem('@!access%voda', JSON.stringify(true));
    window.localStorage.setItem('@!money%voda', JSON.stringify(Number(data.voda)));
    window.localStorage.setItem('@!unite%voda', JSON.stringify(Number(UniteVodA)));

   } else {

    window.localStorage.setItem('@!access%voda', JSON.stringify(false));
    window.localStorage.setItem('@!money%voda', JSON.stringify(Number(false)));
    window.localStorage.setItem('@!unite%voda', JSON.stringify(Number(UniteVodA)));
    setVoda(true);
   }

  }
  if (OperaAirtel) {

   if (/^\d+$/.test(`${(data.airtel)}`)) {

    window.localStorage.setItem('@!access%airtel', JSON.stringify(true));
    window.localStorage.setItem('@!money%airtel', JSON.stringify(Number(data.airtel)));
    window.localStorage.setItem('@!unite%airtel', JSON.stringify(Number(UniteAirtel)));

   } else {

    window.localStorage.setItem('@!access%airtel', JSON.stringify(false));
    window.localStorage.setItem('@!money%airtel', JSON.stringify(Number(false)));
    window.localStorage.setItem('@!unite%airtel', JSON.stringify(Number(UniteAirtel)));

    setVoda(true);
   }

  }
  if (OperaOrange) {

   if (/^\d+$/.test(`${(data.orange)}`)) {

    window.localStorage.setItem('@!access%orange', JSON.stringify(true));
    window.localStorage.setItem('@!money%orange', JSON.stringify(Number(data.orange)));
    window.localStorage.setItem('@!unite%orange', JSON.stringify(Number(UniteOrange)));
   } else {

    window.localStorage.setItem('@!access%orange', JSON.stringify(false));
    window.localStorage.setItem('@!money%orange', JSON.stringify(Number(false)));
    window.localStorage.setItem('@!unite%orange', JSON.stringify(Number(UniteOrange)));
    setVoda(true);
   }

  }
  if (OperaAfricell) {

   if (/^\d+$/.test(`${(data.africell)}`)) {
    window.localStorage.setItem('@!access%africell', JSON.stringify(true));
    window.localStorage.setItem('@!money%africell', JSON.stringify(Number(data.africell)));
    window.localStorage.setItem('@!unite%africell', JSON.stringify(Number(UniteAfricell)));
   } else {

    window.localStorage.setItem('@!access%africell', JSON.stringify(false));
    window.localStorage.setItem('@!money%africell', JSON.stringify(Number(false)));
    window.localStorage.setItem('@!unite%africell', JSON.stringify(Number(UniteAfricell)));
    setVoda(true);
   }


  }


  let AccesVodA = JSON.parse(window.localStorage.getItem('@!access%voda'));
  let AccesAirtel = JSON.parse(window.localStorage.getItem('@!access%airtel'));
  let AccesOrange = JSON.parse(window.localStorage.getItem('@!access%orange'));
  let AccesAfricell = JSON.parse(window.localStorage.getItem('@!access%africell'));


  let AcessOperator = Number(AccesVodA) + Number(AccesAirtel) + Number(AccesOrange) + Number(AccesAfricell)

  if (AcessOperator === Operator) {

   // Section no disponiblie 

   // setDialog(true);  // ********
   setOpen(true);
  } else {
   setDialog(false);
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

    <div className='wrp-input-stock-box-prix'>
     <div className='wrp-input-stock-subbox-prix'>
      <div></div>
      <div className='wrp-devise-switch'>
       {checked ? <ReturnDevise IMA={'/img/dollars.png'} /> : <ReturnDevise IMA={'/img/franc.png'} />}

       <Switch
        checked={checked}
        onChange={handleChangeSwitch}
        inputProps={{ 'aria-label': 'controlled' }}
       />

      </div>
     </div>

     <div className='wrp-input-stock-subbox-prix'>
      {checked ?
       <div style={{ color: colorUsd }} className='stock-wallet-prix'>

        <span>{usdnumber}</span>
        <span className='margin-input-stock'>USD</span>

       </div>
       :
       <div style={{ color: colorCdf }} className='stock-wallet-prix'>
        <span>{cdfnumber}</span>
        <span className='margin-input-stock'>CDF</span>
       </div>
      }

      <div></div>
     </div>

    </div>


    {OperaVoda &&
     <div className='wrp-prix-flex-box-broker'>
      <label htmlFor='phone' className='wrp-prix-flex-broker'>
       <div className='wrp-prixs-flex-broker'>
        <ReturnIMA IMA={'/img/vodafone.png'} />
        <span className='pop-up'>Vodacom</span>
       </div>

       <h3>{parseInt(UniteVodA)} u</h3>
      </label>

      <div className='box-flex-prix-brokers'>
       <Controller
        name="voda"
        control={control}
        render={({ field }) =>

         <TextField
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

      </div>
     </div>
    }

    {OperaAirtel &&
     <div className='wrp-prix-flex-box-broker'>

      <label htmlFor='phone' className='wrp-prix-flex-broker'>
       <div className='wrp-prixs-flex-broker'>
        <ReturnIMA IMA={'/img/airtel.jpg'} />
        <span className='pop-up'>Airtel</span>
       </div>

       <h3>{parseInt(UniteAirtel)} u</h3>
      </label>

      <div className='box-flex-prix-brokers'>

       <Controller
        name="airtel"
        control={control}
        render={({ field }) =>

         <TextField
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

      </div>
     </div>
    }

    {OperaOrange &&
     <div className='wrp-prix-flex-box-broker'>

      <label htmlFor='phone' className='wrp-prix-flex-broker'>
       <div className='wrp-prixs-flex-broker'>
        <ReturnIMA IMA={'/img/Orange.png'} />
        <span className='pop-up'>Orange</span>
       </div>

       <h3>{parseInt(UniteOrange)} u</h3>
      </label>

      <div className='box-flex-prix-brokers'>

       <Controller
        name="orange"
        control={control}
        render={({ field }) =>

         <TextField
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

      </div>
     </div>
    }

    {OperaAfricell &&
     <div className='wrp-prix-flex-box-broker'>

      <label htmlFor='phone' className='wrp-prix-flex-broker'>
       <div className='wrp-prixs-flex-broker'>
        <ReturnIMA IMA={'/img/africell.jpg'} />
        <span className='pop-up'>Africell</span>
       </div>

       <h3>{parseInt(UniteAfricell)} u</h3>
      </label>

      <div className='box-flex-prix-brokers'>

       <Controller
        name="africell"
        control={control}
        render={({ field }) =>

         <TextField
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

      </div>
     </div>
    }

    {checked == true && value > 1 && <button onClick={handleClickDialog('paper')} className='Btn-Broker'>Suivant</button>}
    {checked == false && value > 2000 && <button className='Btn'>Suivant</button>}
   </form>

   <Dialog
    fullWidth={fullWidth}
    maxWidth={maxWidth}
    open={open}
    onClose={handleClose}>

    <DialogTitle><h2 className='pop-up'>MuunganoMoney</h2></DialogTitle>
    <DialogContent>

     <DialogContentText>
      <p className='pop-up'>
       Désolé, ce service est temporairement indisponible, veuillez contacter MuunganoMoney. Pour plus d'informations.
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
    open={voda}
    onClose={handleVoda}>

    <DialogTitle><h2 className='pop-up'>MuunganoMoney</h2></DialogTitle>
    <DialogContent>

     <DialogContentText>
      <p className='pop-up'>
       Merci d'indiquer la quantité
      </p>
     </DialogContentText>

    </DialogContent>
    <DialogActions>
     <Button onClick={handleVoda}><span className='pop-up'>Fermer</span></Button>
    </DialogActions>
   </Dialog>

   <Dialog
    open={dialog}
    onClose={dialogClose}
    scroll={scroll}
    aria-labelledby="scroll-dialog-title"
    aria-describedby="scroll-dialog-description"
   >
    <DialogTitle id="scroll-dialog-title"><h4 className='pop-up'>Facturation</h4></DialogTitle>
    <DialogContent dividers={scroll === 'body'}>

     <DialogContentText
      id="scroll-dialog-description"
      ref={descriptionElementRef}
      tabIndex={-1}
     >

      {OperaVoda && <Billing devise={checked ? 'USD' : 'CDF'} Operator='Vodacom' prix={watch('voda')} count={checked ? UniteVodA : UniteVodA} />}
      {OperaAirtel && <Billing devise={checked ? 'USD' : 'CDF'} Operator='Airtel' prix={watch('airtel')} count={checked ? UniteAirtel : UniteAirtel} />}
      {OperaOrange && <Billing devise={checked ? 'USD' : 'CDF'} Operator='Orange' prix={watch('orange')} count={checked ? UniteOrange : UniteOrange} />}
      {OperaAfricell && <Billing devise={checked ? 'USD' : 'CDF'} devise={checked ? 'USD' : 'CDF'} Operator='Africell' prix={watch('africell')} count={checked ? UniteAfricell : UniteAfricell} />}


     </DialogContentText>

    </DialogContent>

    <DialogActions>
     <Button onClick={dialogClose}><span className='pop-up'>Annuler</span></Button>
     <Button onClick={dialogConfirm}><span className='pop-up'>Valider</span></Button>
    </DialogActions>
   </Dialog>

  </>
 )
};

export const Billing = (props) => {

 return (
  <div className='view-dialog-billing'>

   <h2>{props.Operator}</h2>
   <div className='view-dialog-billing-quote'>

    <div className='dialog-count margin-dialog-count'>
     <h3>Montant</h3>
     <p>{props.prix} {props.devise}</p>
    </div>

    <div className='dialog-count'>
     <h3>Unite</h3>
     <p>{parseInt(Number(props.count))}</p>
    </div>

   </div>

   <div className='divider-dialog'></div>
  </div>

 );
}