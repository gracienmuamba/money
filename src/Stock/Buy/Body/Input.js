import React, { useState, useEffect } from 'react';
import './Network.css';
import './Input.css';
import './Prix.css';
import ReturnTitle from './Title';
import { useForm, Controller } from 'react-hook-form';
import Switch from '@mui/material/Switch';
import ReturnDevise from './Devise';

import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';
import ReturnRate from './Rate';
import { useNavigate } from 'react-router-dom';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import './Progres.css';

import moment from 'moment';
import { v4 } from 'uuid';



// Money Africell
let africount = 1;
let afriprice = 0.00955;

// Money Orange
let orangecount = 1;
let orangeprice = 0.0096;

// Money Airtel
let airtelcount = 1;
let airtelprice = 0.00955;

// Money Vodacom
let vodacount = 1;
let vodaprice = 0.00955;


let pushDocs = new Array();

let firstname = '';
let lastname = '';


let dialogVoda = false;
let dialogAirtel = false;

let dialogOrange = false;
let dialogAfricell = false;


let money = 0;


// Form Input Stock 
export default function ReturnStocKInput() {

 const { register, handleSubmit, watch } = useForm({});
 const navigation = useNavigate();

 const [cdf, setCdf] = React.useState(0);
 const [usd, setUsd] = React.useState(0);
 const [checked, setChecked] = React.useState(true);

 const [open, setOpen] = React.useState(false);

 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');

 const [dialog, setDialog] = React.useState(false);
 const [scroll, setScroll] = React.useState('paper');

 const handleClickDialog = (scrollType) => () => {
  setDialog(true);
  setScroll(scrollType);
 };

 const dialogClose = () => {
  setDialog(false);
 };

 const dialogConfirm = () => {

  setDialog(false);
  setIsRunning(true);

  window.localStorage.setItem('%%docs**stock', JSON.stringify(moment().format()));
  window.setTimeout(() => {

   window.localStorage.setItem('&&check**stock', JSON.stringify(true));
   window.localStorage.setItem('&&obj**stock', JSON.stringify({}));


   firstname = JSON.parse(window.localStorage.getItem('--vie&&first**'));
   lastname = JSON.parse(window.localStorage.getItem('--vie&&last**'));

   const collectionIdname = firstname.toLowerCase() + lastname.toLowerCase();
   window.localStorage.setItem('$id&&fiat**col', JSON.stringify(collectionIdname));

   navigation('/stock/pin');
  }, 6930);

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


 React.useEffect(async () => {

  firstname = JSON.parse(window.localStorage.getItem('--vie&&first**'));
  lastname = JSON.parse(window.localStorage.getItem('--vie&&last**'));


  const querySnapshotClient = await getDocs(collection(db, "client"));
  querySnapshotClient.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  var verifierCollection = pushDocs.some((value) => value == JSON.parse(window.localStorage.getItem('USER')));

  try {
   await onSnapshot(doc(db, verifierCollection ? "client" : "agent", JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
    setUsd(doc.data().usd);
    setCdf(doc.data().cdf);
   });
  } catch {
   window.console.log(`Erreur console usd`);
  }

 }, []);

 const handleChangeSwitch = (event) => {
  setChecked(event.target.checked);
 };

 const handleClose = () => {
  setOpen(false);
 };


 let cdfnumber = cdf;
 let usdnumber = usd;

 let usdvalue = usd;
 let cdfvalue = cdf;


 const str = lastname.toLowerCase() + ' ' + firstname.toLowerCase();
 const str2 = str.charAt(0).toUpperCase() + str.slice(1);

 // View Africell
 if (checked) {
  usdnumber -= watch('afriprice');
  usdvalue -= watch('afriprice');
  afriprice = watch('afriprice');

  dialogAfricell = true;

  if (Number(afriprice) > 0.00955) {

   africount = watch('afriprice', true) / 0.00955;
   africount = parseInt(africount, 10);
   afriprice = watch('africount', true) * 0.00955;

  } else {
   afriprice = 0.00955;
   africount = 1;

  }
 } else {

  cdfnumber -= watch('afriprice');
  cdfvalue -= watch('afriprice');
  afriprice = watch('afriprice');

  dialogAfricell = false;

  if (Number(afriprice) > 22) {

   africount = watch('afriprice', true) / 22.47;
   africount = parseInt(africount, 10);
   afriprice = watch('africount', true) * 22.47;

  } else {
   afriprice = 22.47;
   africount = 1;

  }

 }

 // View Orange
 if (checked) {
  usdnumber -= watch('orangeprice');
  usdvalue -= watch('orangeprice');
  orangeprice = watch('orangeprice');

  dialogOrange = true;


  if (Number(orangeprice) > 0.0096) {

   orangecount = watch('orangeprice', true) / 0.0096;
   orangecount = parseInt(orangecount, 10);
   orangeprice = watch('orangecount', true) * 0.0096;

  } else {
   orangeprice = 0.0096;
   orangecount = 1;

  }
 } else {

  cdfnumber -= watch('orangeprice');
  cdfvalue -= watch('orangeprice');
  orangeprice = watch('orangeprice');

  dialogOrange = false;

  if (Number(orangeprice) > 22.1) {

   orangecount = watch('orangeprice', true) / 22.58;
   orangecount = parseInt(orangecount, 10);
   orangeprice = watch('orangecount', true) * 22.58;

  } else {
   orangeprice = 22.58;
   orangecount = 1;

  }

 }

 // View Airtel
 if (checked) {
  usdnumber -= watch('airtelprice');
  usdvalue -= watch('airtelprice');
  airtelprice = watch('airtelprice');

  dialogAirtel = true;

  if (Number(airtelprice) > 0.00955) {

   airtelcount = watch('airtelprice', true) / 0.00955;
   airtelcount = parseInt(airtelcount, 10);
   airtelprice = watch('airtelcount', true) * 0.00955;

  } else {
   airtelprice = 0.00955;
   airtelcount = 1;

  }
 } else {

  cdfnumber -= watch('airtelprice');
  cdfvalue -= watch('airtelprice');
  airtelprice = watch('airtelprice');


  dialogAirtel = false;


  if (Number(airtelprice) > 22) {

   airtelcount = watch('airtelprice', true) / 22.47;
   airtelcount = parseInt(airtelcount, 10);
   airtelprice = watch('airtelcount', true) * 22.47;

  } else {
   airtelprice = 22.47;
   airtelcount = 1;

  }

 }

 // View Vodacom
 if (checked) {
  usdnumber -= watch('vodaprice');
  usdvalue -= watch('vodaprice');
  vodaprice = watch('vodaprice');

  dialogVoda = true;

  if (Number(vodaprice) > 0.0096) {

   vodacount = watch('vodaprice', true) / 0.0096;
   vodacount = parseInt(vodacount, 10);
   vodaprice = watch('vodacount', true) * 0.0096;

  } else {
   vodaprice = 0.0096;
   vodacount = 1;

  }
 } else {

  cdfnumber -= watch('vodaprice');
  cdfvalue -= watch('vodaprice');
  vodaprice = watch('vodaprice');

  dialogVoda = false;

  if (Number(vodaprice) > 22.58) {

   vodacount = watch('vodaprice', true) / 22.58;
   vodacount = parseInt(vodacount, 10);
   vodaprice = watch('vodacount', true) * 22.58;

  } else {
   vodaprice = 22.58;
   vodacount = 1;

  }

 }


 const [filled, setFilled] = useState(0);
 const [isRunning, setIsRunning] = useState(false);

 useEffect(() => {
  if (filled < 100 && isRunning) {
   setTimeout(() => setFilled(prev => prev += 5), 50)
  }
 }, [filled, isRunning]);

 let colorUsd = usdnumber <= 1 ? '#e6e8e6' : '#1a659e';
 let colorCdf = cdfnumber <= 2000 ? '#e6e8e6' : '#1a659e';

 usdnumber = (usdnumber).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ');
 cdfnumber = (cdfnumber).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ');


 const onSubmit = async (data) => {

  if (checked) {
   window.localStorage.setItem('&&usdvalue**stock', JSON.stringify(Number(usdvalue)));
   window.localStorage.setItem('&&checked**stock', JSON.stringify(true));
  } else {
   window.localStorage.setItem('&&cdfvalue**stock', JSON.stringify(Number(cdfvalue)));
   window.localStorage.setItem('&&checked**stock', JSON.stringify(false));
  }

  money = Number(data.afriprice) + Number(data.orangeprice) + Number(data.airtelprice) + Number(data.vodaprice);

  if (checked === true && money < 1) {
   setOpen(true);
  } else if (checked === false && money < 2000 && parseInt(cdfvalue) < 2000) {
   setOpen(true);
  } else {

   if (checked === true && parseInt(usdvalue) < 1) {

    setOpen(true);
   } else if (checked === false && parseInt(cdfvalue) < 2000) {

    setOpen(true);
   } else {

    if (Number(data.afriprice) > 0) {
     window.localStorage.setItem('´ððchecked˝˝africell', JSON.stringify(true));
     window.localStorage.setItem('´ððprice˝˝africell', JSON.stringify(Number(data.afriprice)));
    } else {
     window.localStorage.setItem('´ððchecked˝˝africell', JSON.stringify(false));
     window.localStorage.setItem('´ððprice˝˝africell', JSON.stringify(Number(false)));
    }

    if (Number(data.orangeprice) > 0) {

     window.localStorage.setItem('´ððchecked˝˝orange', JSON.stringify(true));
     window.localStorage.setItem('´ððprice˝˝orange', JSON.stringify(Number(data.orangeprice)));

    } else {
     window.localStorage.setItem('´ððchecked˝˝orange', JSON.stringify(false));
     window.localStorage.setItem('´ððprice˝˝orange', JSON.stringify(Number(false)));
    }

    if (Number(data.airtelprice) > 0) {

     window.localStorage.setItem('´ððchecked˝˝airtel', JSON.stringify(true));
     window.localStorage.setItem('´ððprice˝˝airtel', JSON.stringify(Number(data.airtelprice)));
    } else {
     window.localStorage.setItem('´ððchecked˝˝airtel', JSON.stringify(false));
     window.localStorage.setItem('´ððprice˝˝airtel', JSON.stringify(Number(false)));
    }

    if (Number(data.vodaprice) > 0) {

     window.localStorage.setItem('´ððchecked˝˝voda', JSON.stringify(true));
     window.localStorage.setItem('´ððprice˝˝voda', JSON.stringify(Number(data.vodaprice)));
    } else {
     window.localStorage.setItem('´ððchecked˝˝voda', JSON.stringify(false));
     window.localStorage.setItem('´ððprice˝˝voda', JSON.stringify(Number(false)));
    }

    window.localStorage.setItem('´ððprice˝˝devise', JSON.stringify(checked));
    window.setTimeout(() => {
     setDialog(true);
    }, 2000);

   }
  }

 }


 let OpVoda = JSON.parse(window.localStorage.getItem('´ððchecked˝˝voda'));
 let OpAirtel = JSON.parse(window.localStorage.getItem('´ððchecked˝˝airtel'));
 let OpOrange = JSON.parse(window.localStorage.getItem('´ððchecked˝˝orange'));
 let OpAfricell = JSON.parse(window.localStorage.getItem('´ððchecked˝˝africell'));


 return (
  <div className='wrp-input-stock'>
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

    <div className='wrp-input-stock-subbox-prix'>
     <div></div>
     <h3>{str2}</h3>
    </div>

   </div>

   <form onSubmit={handleSubmit(onSubmit)} autocomplete="off">
    <ReturnTitle />

    <div className='wrp-network-stock'>
     <div className='afri-change'>
      <h2>Africell</h2>
      <input className='afri-change' autocomplete="off" type='number' placeholder={africount} {...register('africount')} step="0.01" pattern="[0-9]*" />
      <input className='afri-change' autocomplete="off" type='number' placeholder={afriprice} {...register('afriprice')} step="0.01" pattern="[0-9]*" />
     </div>
    </div>

    <div className='wrp-network-stock'>
     <div className='orange-change'>
      <h2>Orange</h2>
      <input className='orange-change' autocomplete="off" type='number' placeholder={orangecount} {...register('orangecount')} step="0.01" pattern="[0-9]*" />
      <input className='orange-change' autocomplete="off" type='number' placeholder={orangeprice} {...register('orangeprice')} step="0.01" pattern="[0-9]*" />
     </div>
    </div>

    <div className='wrp-network-stock'>
     <div className='airtel-change'>
      <h2>Airtel</h2>
      <input className='airtel-change' autocomplete="off" type='number' placeholder={airtelcount} {...register('airtelcount')} step="0.01" pattern="[0-9]*" />
      <input className='airtel-change' autocomplete="off" type='number' placeholder={airtelprice} {...register('airtelprice')} step="0.01" pattern="[0-9]*" />
     </div>

    </div>

    <div className='wrp-network-stock'>
     <div className='voda-change'>
      <h2>Vodacom</h2>
      <input className='voda-change' autocomplete="off" type='number' placeholder={vodacount} {...register('vodacount')} step="0.01" pattern="[0-9]*" />
      <input className='voda-change' autocomplete="off" type='number' placeholder={vodaprice} {...register('vodaprice')} step="0.01" pattern="[0-9]*" />
     </div>
    </div>

    <ReturnRate />

    <div className="progressbar-stock">
     <div className="progressbar">

      <div style={{
       height: "100%",
       width: `${filled}%`,
       backgroundColor: "#2ecc2e",
       transition: "width 1s"
      }}></div>


      <span className="progressPercent">{filled}%</span>
     </div>
    </div>

    <button className='Btn'>Suivant</button>
   </form>

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
       Désolé la quantité non prise en compte
       </p>
     </DialogContentText>

    </DialogContent>
    <DialogActions>
     <Button onClick={handleClose}><span className='pop-up'>Fermer</span></Button>
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

      {OpAfricell && <Billing devise={checked ? 'USD' : 'CDF'} devise={checked ? 'USD' : 'CDF'} Operator='Africell' prix={watch('afriprice')} count={checked ? Number(watch('afriprice')) / 0.00955 : Number(watch('afriprice')) / 22.47} />}
      {OpOrange && <Billing devise={checked ? 'USD' : 'CDF'} Operator='Orange' prix={watch('orangeprice')} count={checked ? Number(watch('orangeprice')) / 0.0096 : Number(watch('orangeprice')) / 22.58} />}
      {OpAirtel && <Billing devise={checked ? 'USD' : 'CDF'} Operator='Airtel' prix={watch('airtelprice')} count={checked ? Number(watch('airtelprice')) / 0.00955 : Number(watch('airtelprice')) / 22.47} />}
      {OpVoda && <Billing devise={checked ? 'USD' : 'CDF'} Operator='Vodacom' prix={watch('vodaprice')} count={checked ? Number(watch('vodaprice')) / 0.0096 : Number(watch('vodaprice')) / 22.58} />}


     </DialogContentText>

    </DialogContent>

    <DialogActions>
     <Button onClick={dialogClose}><span className='pop-up'>Annuler</span></Button>
     <Button onClick={dialogConfirm}><span className='pop-up'>Valider</span></Button>
    </DialogActions>
   </Dialog>

  </div>
 );
};

export const Billing = (props) => {
 return (
  <div className='view-dialog-billing'>

   <h2>{props.Operator}</h2>
   <div className='view-dialog-billing-quote'>

    <div className='dialog-count-left margin-dialog-count'>
     <h3>Montant</h3>
     <p>{props.prix} {props.devise}</p>
    </div>

    <div className='dialog-count-right'>
     <h3>Unite</h3>
     <p>{parseInt(Number(props.count))}</p>
    </div>

   </div>

   <div className='divider-dialog'></div>
  </div>

 );
}
