import React from 'react';
import './Push.css';
import Media from 'react-media';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from '../../../firebase';

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

import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';

import ReturnSpinner from './Spinner';
import { HiPlusSm } from "react-icons/hi";
import ReturnProfil from './Profil';

import Box from '@mui/material/Box';
// import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
// import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';



const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
 const { onChange, ...other } = props;
 return (
  <IMaskInput
   {...other}
   mask="#000000000"
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

// Firebase auth 
export let phoneNum = '';
export let pushArray = new Array();

// Input Field Component 
export default function ReturnInput() {
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
     {matches.medium && <SreenLarge />}
     {matches.large && <SreenLarge />}
    </>
   )}
  </Media>
 );
};
export const SreenLarge = () => (
 <FormInput />
);
export const ScreenSmall = () => (
 <FormInput />
);
export const FormInput = () => {

 let pushDoc = new Array();
 const [load, setLoad] = React.useState(false);

 const navigation = useNavigate();
 const { handleSubmit, reset, control, watch } = useForm({});

 const inputRef = React.useRef();
 const [searchTerm, setSearchTerm] = React.useState('');

 const [arr, setArr] = React.useState([]);
 const [open, setOpen] = React.useState(false);

 const [exist, setExist] = React.useState(false);
 const [invite, setInvite] = React.useState(false);
 const [error, setError] = React.useState(false);
 const [pushed, setPushed] = React.useState(true);

 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');



 const [loading, setLoading] = React.useState(false);
 const [success, setSuccess] = React.useState(false);
 const timer = React.useRef();

 const buttonSx = {
  ...(success && {
   bgcolor: green[500],
   '&:hover': {
    bgcolor: green[700],
   },
  }),
 };

 React.useEffect(() => {
  return () => {
   clearTimeout(timer.current);
  };
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
 const handleExists = () => {
  setExist(false);
 };
 const handleError = () => {
  setError(false);
 };
 const handleInvite = () => {
  setInvite(false);
 };

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   pushDoc.push(doc.id);
  });
  setArr(pushDoc);
 }, []);

 const handleButtonClick = () => {
  if (!loading) {
   setSuccess(false);
   setLoading(true);
   timer.current = window.setTimeout(() => {
    setSuccess(true);
    setLoading(false);
   }, 2000);
  }
 };

 let phone = watch('phone');
 let check = false;
 let access = false;

 if (phone === undefined) {
  window.console.log(false);
 } else {

  let checknum = arr.includes(phone);
  check = phone.length === 10 || phone === '' ? false : true;
  phoneNum = phone.length === 10 && checknum ? phone : phone;
  access = phone.length === 10 && checknum && true;

 };

 const handlepush = (event) => {

  event.preventDefault();
  let list = JSON.parse(window.localStorage.getItem('@@xi^^,view**++'));

  if (list.includes(phoneNum)) {
   setExist(true);
  } else {

   if (phoneNum === JSON.parse(window.localStorage.getItem('USER'))) {

    setInvite(true);
    setLoad(false);
    reset();

   } else {

    setPushed(false);

    window.localStorage.setItem('@@xi^^,view**++', JSON.stringify([...list, ...[phoneNum]]));
    window.setTimeout(() => {
     navigation(0);
    }, 500);

   }

  }

 };

 const onSubmit = async (data) => {

  // setLoad(true);
  let list = JSON.parse(window.localStorage.getItem('@@xi^^,view**++'));

  if (list.length >= 1) {

   window.setTimeout(() => {
    navigation('/tontine/group/overview');
   }, 3500);


  } else {
   if (data.phone === undefined) {
    setError(true);
    setLoad(false);
    reset();
   } else {

    let num = (data.phone).match(/\d+/g);
    let numPhone = '';
    num.map(index => {
     numPhone += index;

    })

    if (numPhone.length != 10 || numPhone.charAt(0) != 0) {
     setError(true);
     setLoad(false);
     reset();

    } else {

     if (arr.includes(numPhone)) {
      setLoad(false);

     } else {
      setOpen(true);
      setLoad(false);

     }

    };

   }

  }

 };

 return (
  <>
   <div className='wrp-form-input-sign form-child-bottom-input'>

    <div className='zindex-theme'>
     <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={load}>

      <CircularProgress color="inherit" />
     </Backdrop>
    </div>

    <ReturnSpinner loader={check} />

    {access && <ReturnProfil />}
    {access &&
     <div>
      <>
       {pushed &&
        <div onClick={handlepush} className='wrp-push-invited-icon-tontine'>
         <p>Rejoins le groupe</p>
         <HiPlusSm color={'#929222'} size={'2em'} />
        </div>
       }
      </>

     </div>}

    <form onSubmit={handleSubmit(onSubmit)}>
     <FormControl sx={{ width: '100%' }} variant="standard">
      <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Numéro à inviter</h1></InputLabel>

      <Controller
       name="phone"
       control={control}
       render={({ field }) =>

        <Input
         autoFocus
         value={values.textmask}
         onChange={handleChange}
         inputRef={inputRef}
         onChange={(e) => setSearchTerm(e.target.value)}

         inputProps={{
          autoComplete: "off", inputMode: 'tel'
         }}

         InputProps={{
          inputComponent: NumericFormatCustom,
         }}

         inputmode="tel"
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
      open={error}
      onClose={handleError}
     >
      <DialogTitle><p className='pop-up'>MuunganoMoney</p></DialogTitle>
      <DialogContent>

       <DialogContentText>
        <p className='pop-up'>
         Le numéro utilisé est invalide, veuillez vérifier
      </p>
       </DialogContentText>

      </DialogContent>
      <DialogActions>
       <Button onClick={handleError}><span className='pop-up'>Fermer</span></Button>
      </DialogActions>
     </Dialog>

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
         Désolé, ce numéro ne peut pas être utilisé sur l'espace Tontine.
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
      onClose={handleExists}
     >
      <DialogTitle><p className='pop-up'>MuunganoMoney</p></DialogTitle>
      <DialogContent>

       <DialogContentText>
        <p className='pop-up'>
         Désolé, ce numéro est déjà ajouté
       </p>
       </DialogContentText>

      </DialogContent>
      <DialogActions>
       <Button onClick={handleExists}><span className='pop-up'>Fermer</span></Button>
      </DialogActions>
     </Dialog>

     <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={invite}
      onClose={handleInvite}
     >
      <DialogTitle><p className='pop-up'>MuunganoMoney</p></DialogTitle>
      <DialogContent>

       <DialogContentText>
        <p className='pop-up'>
         Désolé seulement les amis, pas votre propre numéro
       </p>
       </DialogContentText>

      </DialogContent>
      <DialogActions>
       <Button onClick={handleInvite}><span className='pop-up'>Fermer</span></Button>
      </DialogActions>
     </Dialog>


     <button>
      <Box sx={{ position: 'relative' }}>
       <Fab
        aria-label="save"
        color="primary"
        sx={buttonSx}
        onClick={handleButtonClick}
       >
        {success ? <CheckIcon /> : <SaveIcon />}
       </Fab>
       {loading && (
        <CircularProgress
         size={65}
         sx={{
          color: green[500],
          position: 'absolute',
          top: 25,
          left: 166,
          zIndex: 1,
         }}
        />
       )}
      </Box>
     </button>
    </form>
   </div>
  </>
 );
};
