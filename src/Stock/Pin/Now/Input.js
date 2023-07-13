import React from 'react';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { getDocs, doc, onSnapshot, updateDoc, collection, setDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../firebase';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import moment from 'moment';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import secureLocalStorage from "react-secure-storage";


let nowFromDate = moment().format();


export async function getDocsView(col, fiatDocs, data) {
  await setDoc(doc(db, col, fiatDocs), { date: moment().format(), data: arrayUnion(data) }, { merge: true });
};
export async function updateTimeTransaction() {
  await setDoc(doc(db, secureLocalStorage.getItem("USER"), JSON.parse(window.localStorage.getItem('--vie&&id'))),
    { date: moment().format() },
    { merge: true });
};



// View Form Update view
export default function ReturnFormUpdate() {
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
  <div className='wrp-form-input-nows'>
    <FormInputField />
  </div>
);
export const ScreenSmall = () => (
  <div className='wrp-form-input-nows'>
    <FormInputField />
  </div>
);
export const FormInputField = () => {


  const [load, setLoad] = React.useState(false);

  let pushDocs = new Array();
  let regular = /[a-z]+/;


  let priceAfricell = JSON.parse(window.localStorage.getItem('´ððprice˝˝africell'));
  let priceOrange = JSON.parse(window.localStorage.getItem('´ððprice˝˝orange'));
  let priceAirtel = JSON.parse(window.localStorage.getItem('´ððprice˝˝airtel'));
  let priceVoda = JSON.parse(window.localStorage.getItem('´ððprice˝˝voda'));


  // ID collections
  // let fiatColl = JSON.parse(window.localStorage.getItem('$id&&fiat**col'));
  let fiatColl = JSON.parse(window.localStorage.getItem('--vie&&id'));
  let fiatDocs = JSON.parse(window.localStorage.getItem('%%docs**stock'));


  const navigation = useNavigate();
  const { handleSubmit, reset, control } = useForm();
  const [pin, setPin] = React.useState(null);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [status, setStatus] = React.useState(null);


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

    const verifierCollection = pushDocs.some((value) => value == secureLocalStorage.getItem("USER"));
    const unsub = onSnapshot(doc(db, verifierCollection ? "client" : "agent", secureLocalStorage.getItem("USER")), (doc) => {
      setPin(doc.data().code);
      setStatus(doc.data().state);
    });

  }, []);

  const onSubmit = async (data) => {

    setLoad(true);

    if (data.code === undefined) {
      setOpen(true);
      reset();

    } else {
      if (data.code.length != 6 || regular.test(data.code)) {
        setOpen(true);
        reset();

      } else {

        if (pin != data.code) {
          setOpen(true);
          reset();
        } else {


          if (JSON.parse(window.localStorage.getItem('&&checked**stock'))) {

            if (priceAfricell > 0.5) {
              let credit = Number(priceAfricell) / 0.00955;
              let africell = { operator: 'africell', price: priceAfricell, devise: 'USD', count: parseInt(credit), status: false, date: moment().format() }
              getDocsView(fiatColl, fiatDocs, africell);

            };
            if (priceOrange > 0.5) {

              let credit = Number(priceOrange) / 0.0096;
              let orange = { operator: 'orange', price: priceOrange, devise: 'USD', count: parseInt(credit), status: false, date: moment().format() }
              getDocsView(fiatColl, fiatDocs, orange);

            };
            if (priceAirtel > 0.5) {

              let credit = Number(priceAirtel) / 0.00955;
              let airtel = { operator: 'airtel', price: priceAirtel, devise: 'USD', count: parseInt(credit), status: false, date: moment().format() }
              getDocsView(fiatColl, fiatDocs, airtel);

            };
            if (priceVoda > 0.5) {
              let credit = Number(priceVoda) / 0.0096;
              let voda = { operator: 'vodacom', price: priceVoda, devise: 'USD', count: parseInt(credit), status: false, date: moment().format() }
              getDocsView(fiatColl, fiatDocs, voda);

            };

            updatesoldusd(JSON.parse(window.localStorage.getItem('&&usdvalue**stock')));

          } else {

            if (priceAfricell > 22) {
              let credit = Number(priceAfricell) / 22.47;
              let africell = { operator: 'africell', price: priceAfricell, devise: 'CDF', count: parseInt(credit), status: false, date: nowFromDate }
              getDocsView(fiatColl, fiatDocs, africell);

            };
            if (priceOrange > 22) {
              let credit = Number(priceOrange) / 22.58;
              let orange = { operator: 'orange', price: priceOrange, devise: 'CDF', count: parseInt(credit), status: false, date: nowFromDate }
              getDocsView(fiatColl, fiatDocs, orange);

            };
            if (priceAirtel > 22) {

              let credit = Number(priceAirtel) / 22.47;
              let airtel = { operator: 'airtel', price: priceAirtel, devise: 'CDF', count: parseInt(credit), status: false, date: nowFromDate }
              getDocsView(fiatColl, fiatDocs, airtel);

            };
            if (priceVoda > 22) {
              let credit = Number(priceVoda) / 22.58;
              let voda = { operator: 'vodacom', price: priceVoda, devise: 'CDF', count: parseInt(credit), status: false, date: nowFromDate }
              getDocsView(fiatColl, fiatDocs, voda);

            };

            updatesoldcdf(JSON.parse(window.localStorage.getItem('&&cdfvalue**stock')));

          }


          updateTimeTransaction(moment().format());
          window.setTimeout(() => {

            window.localStorage.setItem('--vie&&id', JSON.stringify(null));
            window.localStorage.setItem('--vie&&first**', JSON.stringify(null));
            window.localStorage.setItem('--vie&&last**', JSON.stringify(null));

            window.localStorage.setItem('&&check**stock', JSON.stringify(false));
            navigation('/brokers/unite/thank');

          }, 3450);
        }

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

        <FormControl
          sx={{ width: '100%' }}

          variant="standard">
          <InputLabel htmlFor="standard-adornment-password"><span className='pop-up'>Pin actuel</span></InputLabel>

          <Controller
            name="code"
            control={control}
            render={({ field }) =>

              <Input
                onFocus
                id="standard-adornment-password"
                {...field}
                type={showPassword ? 'numeric' : 'password'}

                inputProps={{
                  autoComplete: "off", inputMode: 'numeric'
                }}
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

          <DialogTitle><h1 className='pop-up'>MuunganoMoney</h1></DialogTitle>
          <DialogContent>

            <DialogContentText>
              <p className='pop-up'>
                Code pin incorrect
     </p>
            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}><span className='pop-up'>Fermer</span></Button>
          </DialogActions>
        </Dialog>

        <button className='Btn-Broker'>Envoi</button>
      </form>
    </>
  );

};


// View component 
export async function updatesoldcdf(money) {

  const washingtonRef = doc(db, "agent", secureLocalStorage.getItem("USER"));

  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    cdf: money
  });

};
// View component 
export async function updatesoldusd(money) {

  const washingtonRef = doc(db, "agent", secureLocalStorage.getItem("USER"));
  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    usd: money
  });
};