import React from 'react';
import './Btn.css';
import Media from 'react-media';
import { doc, onSnapshot, getDocs, collection, updateDoc, increment } from "firebase/firestore";
import { db } from '../../../firebase';
import moment from 'moment';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';


import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import secureLocalStorage from "react-secure-storage";
import { CiUnlock } from 'react-icons/ci';

export let exchAnge = 0; // Export view 
let pushDocs = new Array();
let verifierCollection;


// Return Phone input component
export default function REturnCurrenT() {
 return (
  <>
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
  </>
 );
};

export const ScreenLarge = () => {
 return (
  <div className='wrp-frais-current'>
   <FormInputValue />
  </div>
 );
};
export const ScreenSmall = () => {
 return (
  <div className='wrp-frais-current-sm'>
   <FormInputValue />
  </div>
 )
};
export const FormInputValue = () => {

 const [cdf, setCdf] = React.useState(null);
 const [usd, setUsd] = React.useState(null);

 const [open, setOpen] = React.useState(false);
 const [add, setAdd] = React.useState(false);

 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');

 const handleClose = () => {
  setOpen(false);
 };
 const handleAdd = () => {
  setAdd(false);
 };


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

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  verifierCollection = pushDocs.includes(secureLocalStorage.getItem("USER"));

  try {
   const unsub = onSnapshot(doc(db, verifierCollection ? "client" : "agent", secureLocalStorage.getItem("USER")), (doc) => {
    setCdf(doc.data().thriftcdf);
    setUsd(doc.data().thriftusd);
   });
  } catch {
   window.console.log('error');
  }

 }, []);

 const handleIncrementMoney = (event) => {

  event.preventDefault();

  if (cdf > 0 || usd > 0) {

   window.setTimeout(() => {

    setAdd(true);
    incrementThrift(cdf, usd, verifierCollection);
    depreciateThrift(verifierCollection);

   }, 3000);

  } else {
   setOpen(true);

  }
 };

 return (
  <>
   {moment().date() <= 3 ?
    <div onClick={handleIncrementMoney}>

     <Box sx={{ m: 1, position: 'relative' }}>
      <Fab
       aria-label="save"
       color="primary"
       sx={buttonSx}
       onClick={handleButtonClick}
      >
       {success ? <CheckIcon /> : <CiUnlock size={'3em'} />}
      </Fab>


      {loading && (
       <CircularProgress
        size={68}
        sx={{
         color: green[500],
         position: 'absolute',
         top: -6,
         left: -6,
         zIndex: 1,
        }}
       />)}

     </Box>


    </div>
    :
    <div></div>
   }

   <Dialog
    fullWidth={fullWidth}
    maxWidth={maxWidth}
    open={open}
    onClose={handleClose}>
    <DialogTitle><p className='pop-up'>MuunganoMoney</p></DialogTitle>
    <DialogContent>

     <DialogContentText>
      <p className='pop-up'>
       Désolé solde insuffisant
     </p>
     </DialogContentText>

    </DialogContent>
    <DialogActions>
     <Button onClick={handleClose}>Fermer</Button>
    </DialogActions>
   </Dialog>

   <Dialog
    fullWidth={fullWidth}
    maxWidth={maxWidth}
    open={add}
    onClose={handleAdd}>
    <DialogTitle><p className='pop-up'>MuunganoMoney</p></DialogTitle>
    <DialogContent>

     <DialogContentText>
      <p className='pop-up'>
       Le solde principal vient d'être augmenté
     </p>
     </DialogContentText>

    </DialogContent>
    <DialogActions>
     <Button onClick={handleAdd}>Fermer</Button>
    </DialogActions>
   </Dialog>

  </>
 );
};

async function incrementThrift(prixCdf, prixUsd, collections) {

 const washingtonRef = doc(db, collections ? "client" : "agent", secureLocalStorage.getItem("USER"));
 // Set the "capital" field of the city 'DC'
 await updateDoc(washingtonRef, {
  cdf: increment(prixCdf),
  usd: increment(prixUsd),
 });

}
async function depreciateThrift(collections) {

 const washingtonRef = doc(db, collections ? "client" : "agent", secureLocalStorage.getItem("USER"));
 // Set the "capital" field of the city 'DC'
 await updateDoc(washingtonRef, {
  thriftcdf: 0,
  thriftusd: 0,
 });

};


