import React from 'react';
import './Invited.css';
import { useNavigate } from 'react-router-dom';

import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import secureLocalStorage from "react-secure-storage";

// view invite component
export default function ReturnInvited() {

 const [list, setList] = React.useState([]);
 const [load, setLoad] = React.useState(false);
 const [open, setOpen] = React.useState(false);

 const navigation = useNavigate();

 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');

 const handleClose = () => {
  setOpen(false);
 };


 React.useEffect(async () => {

  try {
   const unsub = onSnapshot(doc(db, "client", secureLocalStorage.getItem("USER")), (doc) => {
    setList(doc.data().tontinegroup);
   });
  } catch (e) {
   setList([])
  }

 }, []);

 const handlepath = (event) => {

  event.preventDefault();

  setLoad(true);
  window.localStorage.setItem('&&$$list¶-¨', JSON.stringify(list));

  if (list === undefined) {
   setOpen(true);
   setLoad(false);

  } else {
   window.console.log('not undefied');
   window.setTimeout(() => {
    navigation('/tontine/group');
   }, 2000);

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

   <div className='tontine-send-invited'>
    <img onClick={handlepath} src={'/img/send-invited.png'} />
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
       Aucun groupe Tontine créé
       </p>
     </DialogContentText>

    </DialogContent>
    <DialogActions>
     <Button onClick={handleClose}><span className='pop-up'>Fermer</span></Button>
    </DialogActions>
   </Dialog>

  </>
 );
};