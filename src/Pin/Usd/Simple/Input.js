import React from 'react';
import './Input.css';
import Media from 'react-media';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { doc, getDocs, collection, updateDoc, increment, getDoc, onSnapshot, arrayUnion } from "firebase/firestore";
import { db } from '../../../firebase';
import REturnQuOte from './Quote';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import moment from 'moment';

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


export let nowField = moment().date();
export let now = moment().date();


export let prixHash = 0;
export let hashTrue = true;

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
 <div className='wrp-form-input-pin'>
  <REturnQuOte />
  <FormInput />

 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-form-input-pin'>
  <REturnQuOte />
  <FormInput />
 </div>
);

export const FormInput = () => {

 let pushDocs = new Array();
 let verifierSend;
 let verifierGet;

 const [load, setLoad] = React.useState(false);
 const navigation = useNavigate();
 const { register, handleSubmit, reset, control } = useForm();

 //  order notebook
 const [tableClient, setTableClient] = React.useState();
 const [tableAgent, setTableAgent] = React.useState();
 const [tableUpgrade, setTableUpgrade] = React.useState();
 const [tableAdmin, setTableAdmin] = React.useState();
 const [tableFrais, setTableFrais] = React.useState();

 // send React useState  
 const [pin, setPin] = React.useState(null);
 const [state, setState] = React.useState(null);
 const [first, setFirst] = React.useState('');
 const [last, setLast] = React.useState('');
 const [soldeMain, setSoldeMain] = React.useState(null);

 // getting React useState
 const [getstate, setGetstate] = React.useState(null);
 const [getfirst, setGetFirst] = React.useState('');
 const [getlast, setGetLast] = React.useState('');

 const [price, setPrice] = React.useState(0);


 const [open, setOpen] = React.useState(false);
 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');

 const [showPassword, setShowPassword] = React.useState(false);

 const handleClickShowPassword = () => setShowPassword((show) => !show);
 const handleMouseDownPassword = (event) => {
  event.preventDefault();
 };

 const handleClose = () => {
  setOpen(false);
 };

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  verifierSend = pushDocs.some(value => value == JSON.parse(window.localStorage.getItem('USER')));
  verifierGet = pushDocs.some(value => value == JSON.parse(window.localStorage.getItem('A@@ph$$&-@#')));

  const unsub = onSnapshot(doc(db, verifierSend ? "client" : "agent", JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
   setPin(doc.data().code);
   setState(doc.data().state);
   setFirst(doc.data().firstname);
   setLast(doc.data().lastname);
   setSoldeMain(doc.data().usd);
  });

  const getRef = doc(db, verifierGet ? "client" : "agent", JSON.parse(window.localStorage.getItem('A@@ph$$&-@#')));
  const getSnap = await getDoc(getRef);

  if (getSnap.exists()) {
   setGetstate(getSnap.data().state);
   setGetFirst(getSnap.data().firstname);
   setGetLast(getSnap.data().lastname);
   setPrice(getSnap.data().usd);
  };


  try {
   await onSnapshot(doc(db, "clients", "emoney"), (doc) => {
    setTableClient(doc.data().usd);
   });
   await onSnapshot(doc(db, "agents", "emoney"), (doc) => {
    setTableAgent(doc.data().usd);
   });
   await onSnapshot(doc(db, "muungano", "commission"), (doc) => {
    setTableAdmin(doc.data().usd);
   });

   await onSnapshot(doc(db, "agents", "commission"), (doc) => {
    setTableFrais(doc.data().usd);
   });

   await onSnapshot(doc(db, "muungano", "upgrade"), (doc) => {
    setTableUpgrade(doc.data().usd);
   });

  } catch {
   window.console.log('Erreur disponible');
  }

 }, []);

 const onSubmit = async (data) => {

  setLoad(true);
  window.localStorage.setItem('@dateª©#&&++#', JSON.stringify(moment().format('LLLL')));
  reactLocalStorage.set('##^^@@%^***^^++=$', true);

  // Checked if value code is length valid
  if (data.code === undefined || pin != data.code || pin == '000000' || soldeMain <= 1) {
   setOpen(true);
   setLoad(false);
   reset();

  } else {

   const sendUser = first.toLowerCase() + ' ' + last.toLowerCase();
   const getUser = getfirst.toLowerCase() + ' ' + getlast.toLowerCase();

   if (state == "agent" && getstate == "agent") {

    window.localStorage.setItem('@ª©##', JSON.stringify(false));
    window.localStorage.setItem('@cost##', JSON.stringify(true));

    hashTrue = false;
    prixHash = JSON.parse(window.localStorage.getItem('@solde!#!'));

    let soldeAgent = Number(tableAgent[nowField]) + JSON.parse(window.localStorage.getItem('@solde!#!'));
    let soldeUpgrade = Number(tableUpgrade[nowField]) + JSON.parse(window.localStorage.getItem('@solde!#!'));
    let soldeAdminFrais = Number(tableAdmin[nowField]) + JSON.parse(window.localStorage.getItem('@frais!#!'));

    let arrayAgent = tableAgent;
    let arrayUpgrade = tableUpgrade;
    let arrayAdmin = tableAdmin;

    for (let i = now; i <= 31; i++) {
     arrayAgent[i] = soldeAgent;
     arrayUpgrade[i] = soldeUpgrade;
     arrayAdmin[i] = soldeAdminFrais;

    };

    const sendPhone = JSON.parse(window.localStorage.getItem('USER'));
    const getPhone = JSON.parse(window.localStorage.getItem('A@@ph$$&-@#'));
    const prix = JSON.parse(window.localStorage.getItem('@solde!#!'));
    const unite = JSON.parse(window.localStorage.getItem('@unite!#!'));
    const money = JSON.parse(window.localStorage.getItem('@solde!#!'));
    const frais = JSON.parse(window.localStorage.getItem('@frais!#!'));
    const main = JSON.parse(window.localStorage.getItem('@main!#!'));

    swapInWithDocsAgent(sendPhone, getPhone, sendUser, getUser, main, money, frais, unite, arrayAgent, arrayUpgrade, arrayAdmin, price);


    window.setTimeout(() => {
     navigation('/send-success-usd');
    }, 3440)


   } else if (state == "client" && getstate == "client") {


    window.localStorage.setItem('@ª©##', JSON.stringify(false));

    hashTrue = false;
    prixHash = JSON.parse(window.localStorage.getItem('@solde!#!'));

    let soldeClient = Number(tableClient[nowField]) + JSON.parse(window.localStorage.getItem('@solde!#!'));
    let soldeUpgrade = Number(tableUpgrade[nowField]) + JSON.parse(window.localStorage.getItem('@solde!#!'));
    let soldeAdminFrais = Number(tableAdmin[nowField]) + JSON.parse(window.localStorage.getItem('@frais!#!'));

    let arrayClient = tableClient;
    let arrayUpgrade = tableUpgrade;
    let arrayAdmin = tableAdmin;

    for (let i = now; i <= 31; i++) {
     arrayClient[i] = soldeClient;
     arrayUpgrade[i] = soldeUpgrade;
     arrayAdmin[i] = soldeAdminFrais;

    };

    const sendPhone = JSON.parse(window.localStorage.getItem('USER'));
    const getPhone = JSON.parse(window.localStorage.getItem('A@@ph$$&-@#'));
    const money = JSON.parse(window.localStorage.getItem('@solde!#!'));
    const prix = JSON.parse(window.localStorage.getItem('@solde!#!'));
    const unite = JSON.parse(window.localStorage.getItem('@unite!#!'));
    const frais = JSON.parse(window.localStorage.getItem('@frais!#!'));
    const main = JSON.parse(window.localStorage.getItem('@main!#!'));

    isSwapInWithClientToClient(sendPhone, getPhone, sendUser, getUser, main, money, frais, unite, arrayClient, arrayUpgrade, arrayAdmin, price);

    window.setTimeout(() => {
     navigation('/send-success-usd');
    }, 3440)


   } else {

    if (state == "agent") {

     window.localStorage.setItem('@ª©##', JSON.stringify(false));

     hashTrue = false;
     prixHash = JSON.parse(window.localStorage.getItem('@solde!#!'));

     let soldeAgent = Number(tableAgent[nowField]) + JSON.parse(window.localStorage.getItem('@solde!#!'));
     let soldeUpgrade = Number(tableUpgrade[nowField]) + JSON.parse(window.localStorage.getItem('@solde!#!'));

     let arrayAgent = tableAgent;
     let arrayUpgrade = tableUpgrade;

     for (let i = now; i <= 31; i++) {
      arrayAgent[i] = soldeAgent;
      arrayUpgrade[i] = soldeUpgrade;
     };

     const sendPhone = JSON.parse(window.localStorage.getItem('USER'));
     const getPhone = JSON.parse(window.localStorage.getItem('A@@ph$$&-@#'));
     const prix = JSON.parse(window.localStorage.getItem('@solde!#!'));
     const unite = JSON.parse(window.localStorage.getItem('@unite!#!'));
     const frais = JSON.parse(window.localStorage.getItem('@frais!#!'));
     const main = JSON.parse(window.localStorage.getItem('@main!#!'));


     swapInWithDocsAgentToClient(sendPhone, getPhone, sendUser, getUser, main, prix, unite, arrayAgent, arrayUpgrade, price);
     window.setTimeout(() => {
      navigation('/send-success-usd');
     }, 3440)

    } else {

     window.localStorage.setItem('@ª©##', JSON.stringify(false));

     hashTrue = false;
     prixHash = JSON.parse(window.localStorage.getItem('@solde!#!'));

     let soldeClient = Number(tableClient[nowField]) + JSON.parse(window.localStorage.getItem('@solde!#!'));
     let soldeUpgrade = Number(tableUpgrade[nowField]) + JSON.parse(window.localStorage.getItem('@solde!#!'));
     let soldeAdminFrais = Number(tableAdmin[nowField]) + ((JSON.parse(window.localStorage.getItem('@frais!#!')) * 70) / 100);
     let soldeAgentFrais = Number(tableFrais[nowField]) + ((JSON.parse(window.localStorage.getItem('@frais!#!')) * 30) / 100);

     let arrayClient = tableClient;
     let arrayUpgrade = tableUpgrade;
     let arrayAdmin = tableAdmin;
     let arrayAgent = tableFrais;

     for (let i = now; i <= 31; i++) {
      arrayClient[i] = soldeClient;
      arrayUpgrade[i] = soldeUpgrade;
      arrayAdmin[i] = soldeAdminFrais;
      arrayAgent[i] = soldeAgentFrais;

     };

     const sendPhone = JSON.parse(window.localStorage.getItem('USER'));
     const getPhone = JSON.parse(window.localStorage.getItem('A@@ph$$&-@#'));
     const money = JSON.parse(window.localStorage.getItem('@solde!#!'));
     const unite = JSON.parse(window.localStorage.getItem('@unite!#!'));
     const frais = JSON.parse(window.localStorage.getItem('@frais!#!'));
     const main = JSON.parse(window.localStorage.getItem('@main!#!'));


     isSwapInWithClientToAgent(sendPhone, getPhone, sendUser, getUser, main, money, frais, unite, arrayClient, arrayUpgrade, arrayAdmin, arrayAgent, price);
     window.setTimeout(() => {
      navigation('/send-success-usd');
     }, 3440)

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

   <form onSubmit={handleSubmit(onSubmit)}>

    <FormControl
     sx={{ width: '100%' }}

     variant="standard">
     <InputLabel htmlFor="standard-adornment-password"><div className='pop-up'>Pin actuel</div></InputLabel>

     <Controller
      name="code"
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

    <Dialog
     fullWidth={fullWidth}
     maxWidth={maxWidth}
     open={open}
     onClose={handleClose}>

     <DialogTitle><span className='pop-up'>MuunganoMoney</span></DialogTitle>
     <DialogContent>

      <DialogContentText>

       <p className='pop-up'>
        Code pin Incorrect
     </p>

      </DialogContentText>

     </DialogContent>
     <DialogActions>
      <Button onClick={handleClose}><span classNam='pop-up'></span></Button>
     </DialogActions>
    </Dialog>

    <button className='Btn'>Envoi</button>
   </form>

  </>
 )
};

async function swapInWithDocsAgent(sendPhone, getPhone, sendUser, getUser, main, money, frais, unite, arrayAgentMoney, upgrade, adminFrais, solde) {

 let time = moment().format('LLL');
 let send = { date: time, solde: `${money} ${unite}`, phone: getPhone, user: getUser, type: 'envoyer', actual: parseInt(Number(main)) + ' ' + unite, unite: unite }
 let get = { date: time, solde: `${money} ${unite}`, phone: sendPhone, user: sendUser, type: 'Reçu', actual: parseInt((Number(solde) + Number(money))) + ' ' + unite, unite: unite }

 const sendRef = doc(db, "agent", sendPhone);
 await updateDoc(sendRef, {
  usd: (main),
  money: money,
  user: getUser,
  unite: unite,
  phoneclient: getPhone,
  delay: moment().format(),
  swap: arrayUnion(send),
  commission: 0,
  frais: frais,
  sendtype: 'envoyer'
 });

 const getRef = doc(db, "agent", getPhone);
 await updateDoc(getRef, {
  usd: increment(money),
  money: money,
  user: sendUser,
  unite: unite,
  phoneclient: sendPhone,
  delay: moment().format(),
  swap: arrayUnion(get),
  commission: 0,
  frais: 0,
  sendtype: 'Reçu'
 });

 const agentsemoneyRef = doc(db, "agents", "emoney");
 await updateDoc(agentsemoneyRef, {
  usd: arrayAgentMoney
 });

 const upgradeRef = doc(db, "muungano", "upgrade");
 await updateDoc(upgradeRef, {
  usd: upgrade,
 });

 const adminRef = doc(db, "muunganomoney", "money");
 await updateDoc(adminRef, {
  spredusd: increment(frais)
 });

 const fraisRef = doc(db, "muungano", "commission");
 await updateDoc(fraisRef, {
  usd: adminFrais,
 });

 const sendtransaction = doc(db, "muungano", "alltransaction");
 await updateDoc(sendtransaction, {
  send: arrayUnion(send),
 });

 const gettransaction = doc(db, "muungano", "alltransaction");
 await updateDoc(gettransaction, {
  get: arrayUnion(get),
 });

};
async function swapInWithDocsAgentToClient(sendPhone, getPhone, sendUser, getUser, main, prix, unite, arrayAgentMoney, upgrade, solde) {

 let time = moment().format('LLL');
 let send = { date: time, solde: `${prix} ${unite}`, phone: getPhone, user: getUser, type: 'envoyer', actual: parseInt(Number(main)) + ' ' + unite, unite: unite }
 let get = { date: time, solde: `${prix} ${unite}`, phone: sendPhone, user: sendUser, type: 'Reçu', actual: parseInt(Number(solde) + Number(prix)) + ' ' + unite, unite: unite }


 let comm = prix * 0.3 / 100;

 const sendRef = doc(db, "agent", sendPhone);
 await updateDoc(sendRef, {
  usd: increment(-(prix)),
  money: prix,
  user: getUser,
  unite: unite,
  phoneclient: getPhone,
  delay: moment().format(),
  swap: arrayUnion(send),
  thriftcdf: increment(Number(comm)),
  commission: Number(comm),
  frais: 0,
  sendtype: 'envoyer'
 });

 const getRef = doc(db, "client", getPhone);
 await updateDoc(getRef, {
  usd: increment(prix),
  money: prix,
  user: sendUser,
  unite: unite,
  phoneclient: sendPhone,
  delay: moment().format(),
  swap: arrayUnion(get),
  frais: 0,
  sendtype: 'Reçu'
 });

 const agentsemoneyRef = doc(db, "agents", "emoney");
 await updateDoc(agentsemoneyRef, {
  usd: arrayAgentMoney,
 });

 const upgradeRef = doc(db, "muungano", "upgrade");
 await updateDoc(upgradeRef, {
  usd: upgrade,
 });


 const sendtransaction = doc(db, "muungano", "alltransaction");
 await updateDoc(sendtransaction, {
  send: arrayUnion(send),
 });

 const gettransaction = doc(db, "muungano", "alltransaction");
 await updateDoc(gettransaction, {
  get: arrayUnion(get),
 });

};
async function isSwapInWithClientToAgent(sendPhone, getPhone, sendUser, getUser, main, money, frais, unite, arrayClientMoney, upgrade, adminFrais, agentFrais, solde) {

 let time = moment().format('LLL');

 let send = { date: time, solde: `${money} ${unite}`, phone: getPhone, user: getUser, type: 'envoyer', actual: parseInt(Number(main)) + ' ' + unite, unite: unite }
 let get = { date: time, solde: `${money} ${unite}`, phone: sendPhone, user: sendUser, type: 'Reçu', actual: parseInt((Number(solde) + Number(money))) + ' ' + unite, unite: unite }


 let fraisAdmin = frais;
 let fraisAgent = money * 2.7 / 100;


 const sendRef = doc(db, "client", sendPhone);
 await updateDoc(sendRef, {
  usd: (main),
  money: money,
  user: getUser,
  unite: unite,
  phoneclient: getPhone,
  delay: moment().format(),
  swap: arrayUnion(send),
  frais: frais,
  sendtype: 'envoyer'
 });

 const getRef = doc(db, "agent", getPhone);
 await updateDoc(getRef, {
  usd: increment(money),
  money: money,
  user: sendUser,
  unite: unite,
  thriftusd: increment(fraisAgent),
  phoneclient: sendPhone,
  delay: moment().format(),
  swap: arrayUnion(get),
  frais: 0,
  sendtype: 'Reçu',
  commission: fraisAgent
 });

 const adminRef = doc(db, "muunganomoney", "money");
 await updateDoc(adminRef, {
  spredusd: increment(fraisAdmin)
 });

 const agentsemoneyRef = doc(db, "clients", "emoney");
 await updateDoc(agentsemoneyRef, {
  usd: arrayClientMoney,
 });

 const upgradeRef = doc(db, "muungano", "upgrade");
 await updateDoc(upgradeRef, {
  usd: upgrade,
 });

 const agentFraisRef = doc(db, "agents", "commission");
 await updateDoc(agentFraisRef, {
  usd: agentFrais,
 });

 const fraisRef = doc(db, "muungano", "commission");
 await updateDoc(fraisRef, {
  usd: adminFrais,
 });

 const sendtransaction = doc(db, "muungano", "alltransaction");
 await updateDoc(sendtransaction, {
  send: arrayUnion(send),
 });

 const gettransaction = doc(db, "muungano", "alltransaction");
 await updateDoc(gettransaction, {
  get: arrayUnion(get),
 });


};
async function isSwapInWithClientToClient(sendPhone, getPhone, sendUser, getUser, main, money, frais, unite, arrayClientMoney, upgrade, adminFrais, solde) {


 let time = moment().format('LLL');
 let send = { date: time, solde: `${money} ${unite}`, phone: getPhone, user: getUser, type: 'envoyer', actual: parseInt(Number(main)) + ' ' + unite, unite: unite }
 let get = { date: time, solde: `${money} ${unite}`, phone: sendPhone, user: sendUser, type: 'Reçu', actual: parseInt((Number(solde) + Number(money))) + ' ' + unite, unite: unite }


 const sendRef = doc(db, "client", sendPhone);
 await updateDoc(sendRef, {
  usd: (main),
  money: money,
  user: getUser,
  unite: unite,
  phoneclient: getPhone,
  delay: moment().format(),
  swap: arrayUnion(send),
  frais: frais,
  sendtype: 'envoyer'
 });

 const getRef = doc(db, "client", getPhone);
 await updateDoc(getRef, {
  usd: increment(money),
  money: money,
  user: sendUser,
  unite: unite,
  phoneclient: sendPhone,
  delay: moment().format(),
  swap: arrayUnion(get),
  frais: 0,
  sendtype: 'Reçu'
 });

 const adminRef = doc(db, "muunganomoney", "money");
 await updateDoc(adminRef, {
  spredusd: increment(frais)
 });

 const agentsemoneyRef = doc(db, "clients", "emoney");
 await updateDoc(agentsemoneyRef, {
  usd: arrayClientMoney,
 });

 const upgradeRef = doc(db, "muungano", "upgrade");
 await updateDoc(upgradeRef, {
  usd: upgrade
 });

 const fraisRef = doc(db, "muungano", "commission");
 await updateDoc(fraisRef, {
  usd: adminFrais,
 });

 const sendtransaction = doc(db, "muungano", "alltransaction");
 await updateDoc(sendtransaction, {
  send: arrayUnion(send),
 });

 const gettransaction = doc(db, "muungano", "alltransaction");
 await updateDoc(gettransaction, {
  get: arrayUnion(get),
 });


};
