import React from 'react';
import './Input.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Media from 'react-media';

import { useNavigate } from 'react-router-dom';
import ReturnQuote from './Quote';

import { useForm, Controller } from 'react-hook-form';
// Firebase Auth for phone
import { db, auth } from '../firebase';
import { doc, updateDoc, onSnapshot, collection, getDocs, setDoc } from "firebase/firestore";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import FadeLoader from 'react-spinners/FadeLoader';

import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';
import FormControl from '@mui/material/FormControl';
import REturnlogo from './Logo';
import ls from 'localstorage-slim';
import secureLocalStorage from "react-secure-storage";



ls.config.encrypt = true;


let expireNum = 2;
let bluecolor = '#0467a0';


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


export let phoneX = '';


let pushAgent = new Array();
let pushClient = new Array();
let pushDocs = new Array();


// Input Field Form
export default function REturnInPutConnexIon() {
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
  <REturnlogo />
  <FormDataInput />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-form-input-sign'>
  <REturnlogo />
  <FormDataInput />
 </div>
);
export const FormDataInput = () => {

 const [checked, setChecked] = React.useState(true);
 const [open, setOpen] = React.useState(false);
 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');

 const [loading, setLoading] = React.useState(false);
 const [codepin, setCodepin] = React.useState();


 const [listAgent, setListAgent] = React.useState([]);
 const [listClient, setListClient] = React.useState([]);


 const inputRef = React.useRef();
 const [searchTerm, setSearchTerm] = React.useState('');

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

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   pushDocs.push(doc.id);
  });

  const agentSnapshot = await getDocs(collection(db, "agent"));
  agentSnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   pushAgent.push(doc.id);
  });

  setListAgent(pushAgent);

  const clientSnapshot = await getDocs(collection(db, "client"));
  clientSnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   pushClient.push(doc.id);
  });

  setListClient(pushClient);

 }, []);

 const { handleSubmit, reset, control } = useForm({});
 // const { isSubmitting, isValid } = formState;
 const onSubmit = async (data) => {

  let num = (data.phone).match(/\d+/g);
  let numPhone = '';
  num.map(index => {
   numPhone += index;
  });

  setLoading(true);

  if (data.phone === undefined) {

   setOpen(true);
   setLoading(false)
   reset();

  } else {

   if (numPhone.length != 10 || numPhone.charAt(0) != 0) {

    setOpen(true);
    setLoading(false)
    reset();

   } else {

    const isExistAgent = listAgent.some(value => value == numPhone);
    const isExistClient = listClient.some(value => value == numPhone);
    const isInDataPhone = listClient.some(value => value == numPhone);

    if (isExistClient || isExistAgent) {

     const unsub = onSnapshot(doc(db, isInDataPhone ? "client" : "agent", numPhone), (doc) => {
      setCodepin(doc.data().pin);
     });

     phoneX = numPhone;
     secureLocalStorage.setItem('USER', numPhone);
     // window.localStorage.setItem('USER', JSON.stringify(numPhone));

     setChecked(false);
     window.setTimeout(() => {
      setLoading(false)
     }, 1500);

    } else {
     window.setTimeout(() => {
      setLoading(false)
      setOpen(true);
     }, 3530);

     reset();
    }

   }

  }

 };

 return (
  <>
   <div className='recaptcha-container'></div>

   {loading && <div className='Loading-Hm'>
    <FadeLoader
     size={15}
     color={bluecolor}
     loading={loading}
    />
   </div>}

   {checked
    ?
    <form onSubmit={handleSubmit(onSubmit)}>

     <ReturnQuote
      Text={`Envoyer, échanger ou accepter des fiat avec un numero personnel sur votre compte.`}
     />

     <FormControl sx={{ width: '100%' }} variant="standard">
      <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Téléphone</h1></InputLabel>

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
         name="phone"
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
      onClose={handleClose}>

      <DialogTitle><h1 className='pop-up'>MuunganoMoney</h1></DialogTitle>
      <DialogContent>

       <DialogContentText>
        <p className='pop-up'>
         MuunganoMoney ne reconnait pas ce numéro.
       </p>
       </DialogContentText>

      </DialogContent>
      <DialogActions>
       <Button onClick={handleClose}><span className='pop-up'>Fermer</span></Button>
      </DialogActions>
     </Dialog>

     <button className='Btn'>Suivant</button>
     <p className='color-red-msg'>
      Chère Client, pour la protection de votre compte, le code d’Accès et
      le code Pin  restent confidentiel. Merci
     </p>
    </form>

    :
    <InputCodeRecaptcha pin={codepin} collections={pushDocs.includes(phoneX)} />
   }
  </>
 );
};

// input Recaptcha  verifier!
export const InputCodeRecaptcha = (props) => {

 const navigation = useNavigate();

 const [ipUid, setIpUid] = React.useState('');

 const [otp, setOtp] = React.useState(false);
 const { handleSubmit, control } = useForm({});

 const [open, setOpen] = React.useState(false);
 const [cancel, setCancel] = React.useState(false);

 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');
 const [loading, setLoading] = React.useState(false);
 const [showPassword, setShowPassword] = React.useState(false);

 const handleClickShowPassword = () => setShowPassword((show) => !show);
 const handleMouseDownPassword = (event) => {
  event.preventDefault();
 };

 const textFirst = `Veuillez choisir un code d'accès à six chiffres à utiliser pour se connecter`;
 const textLast = `Veuillez définir votre code d'accès`;
 let isInDataPhone = pushClient.some(value => value == secureLocalStorage.getItem("USER"));


 React.useEffect(async () => {
  const unsub = onSnapshot(doc(db, isInDataPhone ? "client" : "agent", secureLocalStorage.getItem("USER")), (doc) => {
   setIpUid(doc.data().ip === undefined ? '' : doc.data().ip);
  });

 }, []);


 const handleClose = () => {
  setOpen(false);
 };
 const cancelClose = () => {
  setCancel(false);
 };

 const onSubmitOTP = async (data) => {

  setLoading(true);

  var navigatorInfo = window.navigator;
  var navigatorScreen = window.screen;

  var uid = navigatorInfo.mimeTypes.length;
  uid += navigatorInfo.userAgent.replace(/\D+/g, '');
  uid += navigatorInfo.plugins.length;

  uid += navigatorScreen.height || '';
  uid += navigatorScreen.width || '';
  uid += navigatorScreen.pixelDepth || '';
  uid += secureLocalStorage.getItem("USER");

  if (data.code === undefined) {
   window.setTimeout(() => {
    setCancel(true);
    setLoading(false);
   }, 999);

  } else {

   if (data.code.length != 6 || !(/^\d+$/.test(`${data.code}`))) {

    window.setTimeout(() => {
     setCancel(true);
     setLoading(false);
    }, 999);

   } else {

    // This first connexion !!!
    if (props.pin == 'ungano') {

     const washingtonRef = doc(db, props.collections ? "client" : "agent", secureLocalStorage.getItem("USER"));
     await updateDoc(washingtonRef, {
      pin: data.code
     });

     secureLocalStorage.setItem("ACTIVE_M_USER", true);

     window.localStorage.setItem('@expire˚˚ø', JSON.stringify(expireNum));
     ls.set('last##73**++Phone &&*@&&@@Number', secureLocalStorage.getItem("USER"), { encrypt: true, secret: 500 });

     let verifierCollection = pushDocs.some((value) => value == secureLocalStorage.getItem("USER"));
     const cityRef = doc(db, verifierCollection ? 'client' : 'agent', secureLocalStorage.getItem("USER"));
     setDoc(cityRef, { ip: uid }, { merge: true });

     secureLocalStorage.setItem("ip^^valid-&&access++dash", uid);
     window.setTimeout(() => {
      navigation('/dash');
      setLoading(false)
     }, 999);

    } else {
     if (props.pin == data.code) {

      // secureLocalStorage.setItem("ACTIVE_M_USER", true);
      // window.localStorage.setItem('@expire˚˚ø', JSON.stringify(expireNum));
      // navigation('/dash');

      window.setTimeout(() => {
       if (uid === ipUid && secureLocalStorage.getItem("USER") === ls.get('last##73**++Phone &&*@&&@@Number', { decrypt: true, secret: 500 })) {

        secureLocalStorage.setItem("ip^^valid-&&access++dash", uid);
        secureLocalStorage.setItem("ACTIVE_M_USER", true);

        window.localStorage.setItem('@expire˚˚ø', JSON.stringify(expireNum));
        ls.set('last##73**++Phone &&*@&&@@Number', secureLocalStorage.getItem("USER"), { encrypt: true, secret: 500 });

        let verifierCollection = pushDocs.some((value) => value == secureLocalStorage.getItem("USER"));
        const cityRef = doc(db, verifierCollection ? 'client' : 'agent', secureLocalStorage.getItem("USER"));
        setDoc(cityRef, { ip: uid }, { merge: true });

        secureLocalStorage.setItem("ip^^valid-&&access++dash", uid);

        window.setTimeout(() => {
         navigation('/dash');
         setLoading(false)
        }, 950);

       } else {

        secureLocalStorage.setItem("ip^^valid-&&access++dash", uid);
        window.location.href = "/auth/redirect/token";
        // navigation('/auth/redirect/token');
       }
      }, 750);

     } else {

      setOtp(true);
      window.setTimeout(() => {
       setOpen(true);
       setLoading(false);
      }, 2100);


     }

    }
   }
  }

 };

 return (
  <>
   {loading && <div className='Loading-Hm'>
    <FadeLoader
     size={15}
     color={bluecolor}
     loading={loading}
    />
   </div>}

   <form onSubmit={handleSubmit(onSubmitOTP)}>

    <input type="phone" className='recaptcha-container' />

    {otp ?
     <>
      <ReturnQuote Text={'valider le code envoyer'} />
      <FormControl
       sx={{ width: '100%' }}

       variant="standard">
       <InputLabel htmlFor="standard-adornment-password"><h1 className='pop-up'>Code actuel</h1></InputLabel>

       <Controller
        name="code"
        control={control}
        render={({ field }) =>

         <Input
          autoFocus
          id="standard-adornment-password"
          {...field}
          inputProps={{
           autoComplete: "off", inputMode: 'numeric'
          }}

          InputProps={{
           inputComponent: NumericFormatCustom,
          }}
          type={showPassword ? 'text' : 'password'}

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

     </>
     :
     <>
      <ReturnQuote Text={props.pin == 'ungano' ? textFirst : textLast} />
      <FormControl
       sx={{ width: '100%' }}

       variant="standard">
       <InputLabel htmlFor="standard-adornment-password"><h1 className='pop-up'>Code actuel</h1></InputLabel>

       <Controller
        name="code"
        control={control}
        render={({ field }) =>

         <Input
          autoFocus
          id="standard-adornment-password"
          {...field}
          inputProps={{
           autoComplete: "off", inputMode: 'numeric'
          }}

          InputProps={{
           inputComponent: NumericFormatCustom,
          }}
          type={showPassword ? 'text' : 'password'}

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

     </>
    }

    <Dialog
     fullWidth={fullWidth}
     maxWidth={maxWidth}
     open={open}
     onClose={handleClose}>

     <DialogTitle><h1 className='pop-up'>MuunganoMoney</h1></DialogTitle>
     <DialogContent>

      <DialogContentText>
       <p className='pop-up'>
        Code d'accès incorrect!
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
     open={cancel}
     onClose={cancelClose}>

     <DialogTitle><h1 className='pop-up'>MuunganoMoney</h1></DialogTitle>
     <DialogContent>

      <DialogContentText>
       <p className='pop-up'>
        Votre code d'accès peut ne pas être accepté, vérifiez
        la recommandation ou consultez un agent muunganomoney.
      </p>
      </DialogContentText>

     </DialogContent>
     <DialogActions>
      <Button onClick={cancelClose}><span className='pop-up'>Fermer</span></Button>
     </DialogActions>
    </Dialog>

    <button className='Btn'>Connexion</button>
   </form>

  </>
 );
};
