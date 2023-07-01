import React, { useState, useEffect } from 'react';
import './Network.css';
import './Input.css';
import './Prix.css';
import ReturnTitle from './Title';
import { useForm } from 'react-hook-form';
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
import secureLocalStorage from "react-secure-storage";

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

let money = 0;


// Form Input Stock 
export default function ReturnStocKInput() {

  const { register, handleSubmit, control, watch } = useForm({});
  const navigation = useNavigate();

  const [cdf, setCdf] = React.useState(0);
  const [usd, setUsd] = React.useState(0);
  const [checked, setChecked] = React.useState(true);

  const [open, setOpen] = React.useState(false);

  const [enableafri, setEnableafri] = React.useState(false);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  React.useEffect(async () => {

    firstname = JSON.parse(window.localStorage.getItem('--vie&&first**'));
    lastname = JSON.parse(window.localStorage.getItem('--vie&&last**'));


    const querySnapshotClient = await getDocs(collection(db, "client"));
    querySnapshotClient.forEach((doc) => {
      pushDocs.push(doc.id);
    });

    var verifierCollection = pushDocs.some((value) => value == secureLocalStorage.getItem("USER"));

    try {
      await onSnapshot(doc(db, verifierCollection ? "client" : "agent", secureLocalStorage.getItem("USER")), (doc) => {
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

  const handleEnableafri = () => {
    setEnableafri(true);
    window.alert('Africell');
  };


  let cdfnumber = cdf;
  let usdnumber = usd;

  let usdvalue = usd;
  let cdfvalue = cdf;

  // View Africell
  if (checked) {
    usdnumber -= watch('afriprice');
    usdvalue -= watch('afriprice');
    afriprice = watch('afriprice');

    if (Number(afriprice) > 0.00955) {

      africount = watch('afriprice', true) * 100;
      africount = parseInt(africount, 10);
      afriprice = watch('africount', true) * 100;

    } else {
      afriprice = 0.00955;
      africount = 1;

    }
  } else {

    cdfnumber -= watch('afriprice');
    cdfvalue -= watch('afriprice');
    afriprice = watch('afriprice');


    if (Number(afriprice) > 22) {

      africount = watch('afriprice', true) / 24;
      africount = parseInt(africount, 10);
      afriprice = watch('africount', true) / 24;

    } else {
      afriprice = 22;
      africount = 1;

    }

  }


  // View Orange
  if (checked) {
    usdnumber -= watch('orangeprice');
    usdvalue -= watch('orangeprice');
    orangeprice = watch('orangeprice');

    if (Number(orangeprice) > 0.0096) {

      orangecount = watch('orangeprice', true) * 100;
      orangecount = parseInt(orangecount, 10);
      orangeprice = watch('orangecount', true) * 100;

    } else {
      orangeprice = 0.0096;
      orangecount = 1;

    }
  } else {

    cdfnumber -= watch('orangeprice');
    cdfvalue -= watch('orangeprice');
    orangeprice = watch('orangeprice');

    if (Number(orangeprice) > 22.1) {

      orangecount = watch('orangeprice', true) / 24;
      orangecount = parseInt(orangecount, 10);
      orangeprice = watch('orangecount', true) / 24;

    } else {
      orangeprice = 22.1;
      orangecount = 1;

    }

  }


  // View Airtel
  if (checked) {
    usdnumber -= watch('airtelprice');
    usdvalue -= watch('airtelprice');
    airtelprice = watch('airtelprice');

    if (Number(airtelprice) > 0.00955) {

      airtelcount = watch('airtelprice', true) * 100;
      airtelcount = parseInt(airtelcount, 10);
      airtelprice = watch('airtelcount', true) * 100;

    } else {
      airtelprice = 0.00955;
      airtelcount = 1;

    }
  } else {

    cdfnumber -= watch('airtelprice');
    cdfvalue -= watch('airtelprice');
    airtelprice = watch('airtelprice');

    if (Number(airtelprice) > 22) {

      airtelcount = watch('airtelprice', true) / 24;
      airtelcount = parseInt(airtelcount, 10);
      airtelprice = watch('airtelcount', true) / 24;

    } else {
      airtelprice = 22;
      airtelcount = 1;

    }

  }


  // View Vodacom
  if (checked) {
    usdnumber -= watch('vodaprice');
    usdvalue -= watch('vodaprice');
    vodaprice = watch('vodaprice');

    if (Number(vodaprice) > 0.0096) {

      vodacount = watch('vodaprice', true) * 100;
      vodacount = parseInt(vodacount, 10);
      vodaprice = watch('vodacount', true) * 100;

    } else {
      vodaprice = 0.0096;
      vodacount = 1;

    }
  } else {

    cdfnumber -= watch('vodaprice');
    cdfvalue -= watch('vodaprice');
    vodaprice = watch('vodaprice');

    if (Number(vodaprice) > 22.1) {

      vodacount = watch('vodaprice', true) / 24;
      vodacount = parseInt(vodacount, 10);
      vodaprice = watch('vodacount', true) / 24;

    } else {
      vodaprice = 22.1;
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

    window.localStorage.setItem('&&check**stock', JSON.stringify(true));

    if (checked) {
      window.localStorage.setItem('&&usdvalue**stock', JSON.stringify(Number(usdvalue)));
      window.localStorage.setItem('&&checked**stock', JSON.stringify(true));
    } else {
      window.localStorage.setItem('&&cdfvalue**stock', JSON.stringify(Number(cdfvalue)));
      window.localStorage.setItem('&&checked**stock', JSON.stringify(false));
    }

    money = Number(data.afriprice) + Number(data.orangeprice) + Number(data.airtelprice) + Number(data.vodaprice);
    window.console.log(money);


    if (checked === true && money < .5) {
      setOpen(true);
    } else if (checked === false && money < 2000 && parseInt(cdfvalue) < 2000) {
      setOpen(true);
    } else {

      if (checked === true && parseInt(usdvalue) < .5) {
        setOpen(true);
      } else if (checked === false && parseInt(cdfvalue) < 2000) {
        setOpen(true);
      } else {

        setIsRunning(true);
        window.setTimeout(() => {
          navigation('/stock/pin');
        }, 7000);
      }

    }

  }

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


      </div>

      <form onSubmit={handleSubmit(onSubmit)} autocomplete="off">
        <ReturnTitle />

        <div className='wrp-network-stock'>
          <div className='afri-change'>
            <h2>Africell</h2>
            <input className='afri-change' autocomplete="off" type='number' placeholder={africount} {...register('africount')} step="0.01" />
            <input className='afri-change' autocomplete="off" type='number' placeholder={afriprice} {...register('afriprice')} step="0.01" />
          </div>
        </div>

        <div className='wrp-network-stock'>
          <div className='orange-change'>
            <h2>Orange</h2>
            <input className='orange-change' autocomplete="off" type='number' placeholder={orangecount} {...register('orangecount')} step="0.01" />
            <input className='orange-change' autocomplete="off" type='number' placeholder={orangeprice} {...register('orangeprice')} step="0.01" />
          </div>
        </div>

        <div className='wrp-network-stock'>
          <div className='airtel-change'>
            <h2>Airtel</h2>
            <input className='airtel-change' autocomplete="off" type='number' placeholder={airtelcount} {...register('airtelcount')} step="0.01" />
            <input className='airtel-change' autocomplete="off" type='number' placeholder={airtelprice} {...register('airtelprice')} step="0.01" />
          </div>

        </div>

        <div className='wrp-network-stock'>
          <div className='voda-change'>
            <h2>Vodacom</h2>
            <input className='voda-change' autocomplete="off" type='number' placeholder={vodacount} {...register('vodacount')} step="0.01" />
            <input className='voda-change' autocomplete="off" type='number' placeholder={vodaprice} {...register('vodaprice')} step="0.01" />
          </div>
        </div>

        <ReturnRate />

        <div className="progressbar-stock">
          <div className="progressbar">

            <div style={{
              height: "100%",
              width: `${filled}%`,
              backgroundColor: "#2ecc2e",
              transition: "width 1.30s"
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
          <Button onClick={handleClose}>Fermer</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}