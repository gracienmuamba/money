import * as React from 'react';
import './Head.css';
import { useForm, Controller } from 'react-hook-form';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

import { doc, setDoc, deleteDoc, collection, getDocs, arrayUnion } from "firebase/firestore";
import { db } from '../../../../firebase';

import moment from 'moment';
import { HiArrowLeft } from 'react-icons/hi';


let pushSnapshots = new Array();


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


let pathPhone = false;
let pathVoda = false;
let pathAirtel = false;
let pathAfricell = false;
let pathOrange = false;


function DrawerAppBar() {

 const navigation = useNavigate();
 const { handleSubmit, control } = useForm({});
 const timer = React.useRef();


 React.useEffect(() => {
  return () => {
   clearTimeout(timer.current);
  };
 }, []);


 const [phone, setPhone] = React.useState(false);
 const [voda, setVoda] = React.useState(false);
 const [airtel, setAirtel] = React.useState(false);
 const [africell, setAfricell] = React.useState(false);
 const [orange, setOrange] = React.useState(false);

 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');


 const inputRef = React.useRef();
 const [searchTerm, setSearchTerm] = React.useState('');

 const clearSearchString = (event) => {
  setSearchTerm('');
  inputRef.current.focus();
 }
 // Obj
 let getDocAlluserInfo = JSON.parse(window.localStorage.getItem('--fiat^^edit-doc'));


 let fiatID = getDocAlluserInfo.id;
 let fiatFirst = getDocAlluserInfo.first;
 let fiatLast = getDocAlluserInfo.last;
 let fiatPhone = getDocAlluserInfo.contact;
 let fiatDwelling = getDocAlluserInfo.dwelling;
 let fiatResidence = getDocAlluserInfo.residence;
 let fiatStaf = getDocAlluserInfo.staf;
 let fiatDate = getDocAlluserInfo.date;

 let fiatVoda = getDocAlluserInfo.voda;
 let fiatAirtel = getDocAlluserInfo.airtel;
 let fiatOrange = getDocAlluserInfo.orange;
 let fiatAfricell = getDocAlluserInfo.africell;


 const str2 = fiatLast.charAt(0).toUpperCase() + fiatLast.slice(1);


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


 const handlePhone = () => {
  setPhone(false);
 };
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


 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, fiatID));
  querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   let obj = { id: doc.id, ...doc.data() }
   pushSnapshots.push(obj);

  });

 }, []);


 // Ref collection database!
 const onSubmit = async (data) => {

  let number = (data.phone).match(/\d+/g);
  let numPhone = '';
  number.map(index => {
   numPhone += index;
  });

  let voda = (data.voda).match(/\d+/g);
  let numPhoneVoda = '';
  voda.map(index => {
   numPhoneVoda += index;
  });



  let airtel = (data.airtel).match(/\d+/g);
  let numPhoneAirtel = '';
  airtel.map(index => {
   numPhoneAirtel += index;
  });

  let orange = (data.orange).match(/\d+/g);
  let numPhoneOrange = '';
  orange.map(index => {
   numPhoneOrange += index;
  });

  let africell = (data.africell).match(/\d+/g);
  let numPhoneAfricell = '';
  africell.map(index => {
   numPhoneAfricell += index;
  });



  if (/^\d+$/.test(`${numPhone}`) && numPhone.length == 10 && data.phone != undefined) {
   pathPhone = true;
  } else {
   setPhone(true);
   pathPhone = false;
  };

  if (/^\d+$/.test(`${numPhoneVoda}`) && numPhoneVoda.length == 10 && (numPhoneVoda.includes('081') || numPhoneVoda.includes('082') || numPhoneVoda.includes('083'))) {
   pathVoda = true;
  } else {
   setVoda(true);
   pathVoda = false;
  };

  if (/^\d+$/.test(`${numPhoneAirtel}`) && numPhoneAirtel.length == 10 && (numPhoneAirtel.includes('099') || numPhoneAirtel.includes('097'))) {
   pathAirtel = true;
  } else {
   setAirtel(true);
   pathAirtel = false;
  };

  if (/^\d+$/.test(`${numPhoneOrange}`) && numPhoneOrange.length == 10 && (numPhoneOrange.includes('089') || numPhoneOrange.includes('084') || numPhoneOrange.includes('080') || numPhoneOrange.includes('085'))) {
   pathOrange = true;
  } else {
   setOrange(true);
   pathOrange = false;
  };

  if (/^\d+$/.test(`${numPhoneAfricell}`) && numPhoneAfricell.length == 10 && (numPhoneAfricell.includes('090') || numPhoneAfricell.includes('091'))) {
   pathAfricell = true;
  } else {
   setAfricell(true);
   pathAfricell = false;
  };


  let identity = {

   firstname: data.firstname.toLowerCase(),
   lastname: data.lastname.toLowerCase(),
   staf: data.staf.toLowerCase(),
   residence: data.residence.toLowerCase(),
   dwelling: data.dwelling.toLowerCase(),
   contact: numPhone,
   date: fiatDate
  }
  let allnum = {

   voda: numPhoneVoda,
   airtel: numPhoneAirtel,
   orange: numPhoneOrange,
   africell: numPhoneAfricell,

  }
  let thisdata = {
   ...identity,
   ...allnum

  }

  let newIdFiat = data.firstname.toLowerCase() + data.lastname.toLowerCase() + data.staf.toLowerCase() + numPhoneVoda + numPhoneAirtel + numPhoneOrange + numPhoneAfricell

  if (pathVoda && pathAirtel && pathAfricell && pathOrange && pathPhone) {

   pushSnapshots.map(index => {
    dateFiatUpdate(newIdFiat, index.id, index.date);
    [...index.data].map(item => { dataFiatUpdate(newIdFiat, index.id, item) })

   })

   removeDocFiAt(fiatID); // remove doc fiat colection agent mere
   window.localStorage.setItem('@%^**fiatpath*>edit', JSON.stringify(false));
   pushSnapshots.map(index => {
    removeDocAllFiAt(fiatID, index.id); // remove all doc for collection unite stock
   });


   window.setTimeout(() => {
    defineNewDocsFiatUpdate(newIdFiat, thisdata);
    navigation('/save/fiat/update/success');
   }, 1000);

  } else {
   window.console.log('not connexion');
  }

 }

 return (
  <div className='flex-head-list-cmd flex-head-list-cmd-button'>

   <header>
    <div className='container'>
     <nav className='navbar'>

      <div onClick={() => navigation(-1)}>
       <HiArrowLeft size={'1.6em'} color={'white'} />
      </div>

      <span>{str2}</span>

     </nav>
    </div>
   </header>

   <section>
    <form onSubmit={handleSubmit(onSubmit)} autocomplete="off">

     <FormControl sx={{ width: '100%' }} variant="standard">
      <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Nom</h1></InputLabel>

      <Controller
       name="firstname"
       defaultValue={fiatFirst}
       control={control}
       render={({ field }) =>

        <Input
         inputProps={{ autoComplete: "off" }}
         name="firstname"
         {...field}
        />}

      />
     </FormControl>

     <FormControl sx={{ width: '100%' }} variant="standard">
      <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Prènom</h1></InputLabel>

      <Controller
       name="lastname"
       defaultValue={fiatLast}
       control={control}
       render={({ field }) =>

        <Input
         inputProps={{ autoComplete: "off" }}
         name="lastname"
         {...field}
        />

       }
      />
     </FormControl>

     <FormControl sx={{ width: '100%' }} variant="standard">
      <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Staf</h1></InputLabel>

      <Controller
       name="staf"
       defaultValue={fiatStaf}
       control={control}
       render={({ field }) =>

        <Input
         inputProps={{ autoComplete: "off" }}
         name="staf"
         {...field}
        />

       }
      />
     </FormControl>

     <FormControl sx={{ width: '100%' }} variant="standard">
      <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Résidence actuelle</h1></InputLabel>

      <Controller
       name="residence"
       defaultValue={fiatResidence}
       control={control}
       render={({ field }) =>

        <Input
         inputProps={{ autoComplete: "off" }}
         name="residence"
         {...field}
        />

       }
      />
     </FormControl>

     <FormControl sx={{ width: '100%' }} variant="standard">
      <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Résidence du staf</h1></InputLabel>

      <Controller
       name="dwelling"
       defaultValue={fiatDwelling}
       control={control}
       render={({ field }) =>

        <Input
         inputProps={{ autoComplete: "off" }}
         name="dwelling"
         {...field}
        />

       }
      />
     </FormControl>

     <FormControl sx={{ width: '100%' }} variant="standard">
      <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Numero de contact</h1></InputLabel>

      <Controller
       name="phone"
       defaultValue={fiatPhone}
       control={control}
       render={({ field }) =>

        <Input
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


     <h1 className='mt-title-update-fiat'>Numéro d'utilisation</h1>


     <FormControl sx={{ width: '100%' }} variant="standard">
      <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Numero Vodacom</h1></InputLabel>

      <Controller
       name="voda"
       defaultValue={fiatVoda}
       control={control}
       render={({ field }) =>

        <Input
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

     <FormControl sx={{ width: '100%' }} variant="standard">
      <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Numero Airtel</h1></InputLabel>

      <Controller
       name="airtel"
       defaultValue={fiatAirtel}
       control={control}
       render={({ field }) =>

        <Input
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

     <FormControl sx={{ width: '100%' }} variant="standard">
      <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Numero Orange</h1></InputLabel>

      <Controller
       name="orange"
       defaultValue={fiatOrange}
       control={control}
       render={({ field }) =>

        <Input
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

     <FormControl sx={{ width: '100%' }} variant="standard">
      <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Numero Africell</h1></InputLabel>

      <Controller
       name="africell"
       defaultValue={fiatAfricell}
       control={control}
       render={({ field }) =>

        <Input
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


     <button className='Btn'>Enregistre</button>
    </form>

   </section>


   <Dialog
    fullWidth={fullWidth}
    maxWidth={maxWidth}
    open={phone}
    onClose={handlePhone}>

    <DialogTitle><span className='pop-up'>MuunganoMoney</span></DialogTitle>
    <DialogContent>

     <DialogContentText>
      <p className='pop-up'>
       Veuillez vérifier le numéro de Contact s'il vous plaît
      </p>
     </DialogContentText>

    </DialogContent>
    <DialogActions>
     <Button onClick={handlePhone}><span className='pop-up'>Fermer</span></Button>
    </DialogActions>
   </Dialog>

   <Dialog
    fullWidth={fullWidth}
    maxWidth={maxWidth}
    open={voda}
    onClose={handleVoda}>

    <DialogTitle><span className='pop-up'>MuunganoMoney</span></DialogTitle>
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

    <DialogTitle><span className='pop-up'>MuunganoMoney</span></DialogTitle>
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

    <DialogTitle><span className='pop-up'>MuunganoMoney</span></DialogTitle>
    <DialogContent>

     <DialogContentText>
      <p className='pop-up'>
       Veuillez vérifier le numéro de téléphone Africell s'il vous plaît
      </p>
     </DialogContentText>

    </DialogContent>
    <DialogActions>
     <Button onClick={handleAfricell}>Fermer</Button>
    </DialogActions>
   </Dialog>

   <Dialog
    fullWidth={fullWidth}
    maxWidth={maxWidth}
    open={orange}
    onClose={handleOrange}>

    <DialogTitle><span className='pop-up'>MuunganoMoney</span></DialogTitle>
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



  </div>
 );
};

// Remove Doc list fiat
export async function removeDocFiAt(docsFiat) {
 await deleteDoc(doc(db, JSON.parse(window.localStorage.getItem('USER')), docsFiat));

}
// Remove Collection list fiat
export async function removeDocAllFiAt(collectionFiat, docsFiat) {
 await deleteDoc(doc(db, collectionFiat, docsFiat));
}
// Set new update doc fiat 
export async function defineNewDocsFiatUpdate(docsIDFiat, data) {

 const cityRef = doc(db, JSON.parse(window.localStorage.getItem('USER')), docsIDFiat);
 setDoc(cityRef, { ...data }, { merge: true });

}
// Set new update date collection fiat 
export async function dateFiatUpdate(collFiat, docsIDFiat, date) {
 const cityRef = doc(db, collFiat, docsIDFiat);
 setDoc(cityRef, { date: date }, { merge: true });

};
// Set new update data collection fiat 
export async function dataFiatUpdate(collFiat, docsIDFiat, data) {
 const cityRef = doc(db, collFiat, docsIDFiat);
 setDoc(cityRef, { data: arrayUnion(data) }, { merge: true });

};


export default DrawerAppBar;

