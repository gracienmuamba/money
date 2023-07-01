import * as React from 'react';
import './Last.css';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase';
import { doc, collection, getDocs, getDocFromCache } from "firebase/firestore";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import secureLocalStorage from "react-secure-storage";
import PrinT from './Print/Main';


let pushDocs = new Array();


// Return Last Transaction
export default function ReturnLasT() {

 const navigation = useNavigate();

 const [open, setOpen] = React.useState(false);
 const [load, setLoad] = React.useState(false);
 const [list, setList] = React.useState([]);

 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');

 React.useEffect(async () => {

  const querySnapshotClient = await getDocs(collection(db, "client"));
  querySnapshotClient.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  var verifierCollection = pushDocs.some((value) => value == secureLocalStorage.getItem("USER"));
  const docRef = doc(db, verifierCollection ? "client" : "agent", secureLocalStorage.getItem("USER"));
  // Get a document, forcing the SDK to fetch from the offline cache.
  try {
   const doc = await getDocFromCache(docRef);
   // Document was found in the cache. If no cached document exists,
   setList(doc.data().swap);
  } catch (e) {
   console.log("Error getting cached document:", e);
  };

 }, []);

 let col = pushDocs.includes(secureLocalStorage.getItem("USER"));
 const handleClose = () => {
  setOpen(false);
 };
 const handlepath = (event) => {

  event.preventDefault();
  setLoad(true);
  window.localStorage.setItem('&&$$!@lis::**swap++', JSON.stringify(list.reverse()));

  if (list.length > 5) {
   window.localStorage.setItem('&&lis++$$!@lis::**||{}', JSON.stringify(5));
  } else {
   window.localStorage.setItem('&&lis++$$!@lis::**||{}', JSON.stringify(list.length));
  }

  window.setTimeout(() => {

   if (list.length === 0) {
    setOpen(true);
    setLoad(false);
   } else {
    navigation('/last/transaction');
   }

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

   <div className='wrp-last-swap-ten'>

    <h3>Dernière transaction</h3>
    <div className='wrp-last-swap-ten-row'>

     <div onClick={handlepath}>
      <IconButton>
       <img src={'/img/arrow.png'} />
      </IconButton>
     </div>

     <PrinT />

    </div>
   </div>

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
       L'historique des transactions est en cours de chargement, veuillez patienter.
       </p>
     </DialogContentText>

    </DialogContent>
    <DialogActions>
     <Button onClick={handleClose}><span className='pop-up'>Fermer</span></Button>
    </DialogActions>
   </Dialog>

  </>
 )
};