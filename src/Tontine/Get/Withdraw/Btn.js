import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import './Btn.css';

import { doc, updateDoc, increment, onSnapshot, deleteDoc, arrayRemove } from "firebase/firestore";
import { db } from '../../../firebase';

import { CiWallet } from "react-icons/ci";
import Backdrop from '@mui/material/Backdrop';


export default function ReturnAskedWallet() {

 const [load, setLoad] = React.useState(false);
 const [asked, setAsked] = React.useState(false);
 const [rising, setRising] = React.useState(false);
 const [devise, setDevise] = React.useState('');

 const [count, setCount] = React.useState(0);
 const [position, setPosition] = React.useState(0);

 const [groupTon, setGroupTon] = React.useState([]);
 const [groupTonDevise, setGroupTonDevise] = React.useState([]);
 const [groupTonName, setGroupTonName] = React.useState([]);

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

 React.useEffect(async () => {

  try {
   const unsub = onSnapshot(doc(db, JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil')), JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
    setAsked(doc.data().asked === undefined ? false : doc.data().asked);
   });

  } catch (error) {
   window.console.log(error);
  }

 }, []);
 React.useEffect(async () => {
  try {
   const unsub = onSnapshot(doc(db, 'tontine', JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil'))), (doc) => {
    setDevise(doc.data().currency);
    setCount(doc.data().count);
    setPosition(doc.data().askedposition);
    setRising(doc.data().rising);
   });
  } catch (error) {
   window.console.log(error);
  }

 }, []);
 React.useEffect(async () => {
  try {
   const unsub = onSnapshot(doc(db, "client", JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
    setGroupTon(doc.data().grouptontine);
    setGroupTonDevise(doc.data().grouptontinedevise);
    setGroupTonName(doc.data().grouptontinename);
   });
  } catch (error) {
   window.console.log(error);
  }
 }, []);



 const handleButtonClick = async () => {

  setLoad(true);
  window.localStorage.setItem('prix^^&&not**', JSON.stringify(true));

  window.setTimeout(async () => {

   const washingtonRef = doc(db, "client", JSON.parse(window.localStorage.getItem('USER')));
   // Atomically remove a region from the "regions" array field.
   await updateDoc(washingtonRef, {
    grouptontine: arrayRemove(JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil')))
   });

  }, 500);
  window.setTimeout(async () => {

   const washingtonRef = doc(db, "client", JSON.parse(window.localStorage.getItem('USER')));
   // Atomically remove a region from the "regions" array field.
   await updateDoc(washingtonRef, {
    grouptontinedevise: arrayRemove(groupTonDevise[groupTon.indexOf(JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil')))])
   });

  }, 500);
  window.setTimeout(async () => {

   const washingtonRef = doc(db, "client", JSON.parse(window.localStorage.getItem('USER')));
   // Atomically remove a region from the "regions" array field.
   await updateDoc(washingtonRef, {
    grouptontinename: arrayRemove(groupTonName[groupTon.indexOf(JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil')))])
   });

  }, 500);
  window.setTimeout(async () => {

   const washingtonRef = doc(db, "client", JSON.parse(window.localStorage.getItem('USER')));
   // Atomically remove a region from the "regions" array field.
   await updateDoc(washingtonRef, {
    grouptontinemoney: arrayRemove(rising.toString())
   });

  }, 500);
  window.setTimeout(async () => {

   if ((devise).includes('CDF') === 'CDF') {

    const washingtonRefCdf = doc(db, "client", JSON.parse(window.localStorage.getItem('USER')));
    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRefCdf, {
     cdf: increment(asked)
    });

   } else if ((devise).includes('USD') === 'USD') {

    const washingtonRefUsd = doc(db, "client", JSON.parse(window.localStorage.getItem('USER')));
    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRefUsd, {
     usd: increment(asked)
    });
   } else {
    window.console.log('nothing');
   }

  }, 1230);


  const listRef = doc(db, "tontine", JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil')));
  // Atomically remove a region from the "regions" array field.
  await updateDoc(listRef, {
   table: arrayRemove(JSON.parse(window.localStorage.getItem('USER')))
  });

  if (!loading) {

   setSuccess(false);
   setLoading(true);
   timer.current = window.setTimeout(async () => {
    setSuccess(true);
    setLoading(false);
   }, 6737);
  };
  window.setTimeout(async () => {

   if (JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘˚˚')).length == 1) {
    await deleteDoc(doc(db, "tontine", JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil'))))
   };

   await deleteDoc(doc(db, JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil')), JSON.parse(window.localStorage.getItem('USER'))));
   window.location.href = "/dash";
  }, 1300);

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


   {Number(count) === Number(position) &&
    <div className='wrp-btn-asked-tontine-withdraw'>
     <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ m: 1, position: 'relative' }}>
       <Fab
        aria-label="save"
        color="primary"
        sx={buttonSx}
        onClick={handleButtonClick}
       >
        {success ? <CheckIcon /> : <CiWallet size={'2.3em'} />}
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
        />
       )}
      </Box>

     </Box>

    </div>
   }
  </>
 );
};
