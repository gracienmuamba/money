import React from 'react';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { doc, onSnapshot, updateDoc, increment, arrayUnion, setDoc } from 'firebase/firestore';
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

  let regular = /[a-z]+/;
  const navigation = useNavigate();
  const { handleSubmit, reset, control } = useForm();
  const [pin, setPin] = React.useState(null);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  let rising = JSON.parse(window.localStorage.getItem('**tont>>count??'));
  let namegroup = JSON.parse(window.localStorage.getItem('**tont>>name??'));
  let currencygroup = JSON.parse(window.localStorage.getItem('**tont>>currency??'));
  let listgroup = JSON.parse(window.localStorage.getItem('@@xi^^,view**++'));
  let docTon = namegroup + JSON.parse(window.localStorage.getItem('USER'));


  const handleClose = () => {
    setOpen(false);
  }
  React.useEffect(async () => {

    try {
      await onSnapshot(doc(db, "client", JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
        setPin(doc.data().code);
      });
    } catch {
      window.console.log(`Erreur`);
    }

  }, []);


  const onSubmit = async (data) => {

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

          let group = namegroup + JSON.parse(window.localStorage.getItem('USER'));

          if (JSON.parse(window.localStorage.getItem('**tont>>currency??')) === 'USD') {
            decrementMoneyClientDollar(Number(rising));
          } else {
            decrementMoneyClientFran(Number(rising));
          }

          let list = JSON.parse(window.localStorage.getItem('@@xi^^,view**++'));

          [...list].map((item) => {

            if (item === JSON.parse(window.localStorage.getItem('USER'))) {
              window.setTimeout(async () => {
                allUserTontine(group, item, rising, 0, true, moment().format(), list.indexOf(item));
                const washingtonRef = doc(db, "client", item);
                await updateDoc(washingtonRef, {
                  grouptontine: arrayUnion(group),
                  grouptontinename: arrayUnion(namegroup)
                });

              }, 500);
            } else {

              window.setTimeout(async () => {
                allUserTontine(group, item, 0, 0, false, moment().format(), list.indexOf(item));
                const washingtonRef = doc(db, "client", item);
                await updateDoc(washingtonRef, {
                  grouptontine: arrayUnion(group),
                  grouptontinename: arrayUnion(namegroup)
                });


              }, 500);
            }
          });

          window.localStorage.setItem('??next^^**$$', JSON.stringify(false));
          createTontine(docTon, rising, rising, listgroup.length, currencygroup, listgroup);

          window.setTimeout(() => {
            navigation('/tontine/form/well');
          }, 1000);


        }

      };

    }

  };

  return (
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
              Code pin Incorrect
     </p>
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}><span className='pop-up'>Fermer</span></Button>
        </DialogActions>
      </Dialog>

      <button className='Btn-Broker'>Créer</button>
    </form>
  );
};


export async function decrementMoneyClientDollar(money) {

  const washingtonRef = doc(db, "client", JSON.parse(window.localStorage.getItem('USER')));

  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    usd: increment(-money)
  });

};
export async function decrementMoneyClientFran(money) {

  const washingtonRef = doc(db, "client", JSON.parse(window.localStorage.getItem('USER')));

  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    cdf: increment(-money)
  });

};

// create Group tontine in the list
export async function createTontine(docUser, rising, asked, count, currency, table) {
  // Add a new document in collection "client"
  await setDoc(doc(db, "tontine", docUser), {
    rising: Number(rising),
    date: moment().format(),
    asked: Number(asked),
    count: Number(count),
    currency: currency,
    position: 1,
    askedposition: 0,
    table: table
  });

};
// create col all user tontine
export async function allUserTontine(colUser, docUser, solde, asked, soldeactive, date, position) {

  let obj = { solde: solde, date: date, asked: asked }
  // Add a new document in collection "tontine"
  await setDoc(doc(db, colUser, docUser), {
    solde: Number(solde),
    soldeactive: soldeactive,
    date: date,
    asked: Number(asked),
    position: Number(position),
    activity: arrayUnion(obj)
  });

}