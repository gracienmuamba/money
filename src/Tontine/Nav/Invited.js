import React from 'react';
import './Invited.css';
import { db } from '../../firebase';
import { doc, getDocFromCache, onSnapshot } from "firebase/firestore";

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import secureLocalStorage from "react-secure-storage";

// View invite component
export default function ReturnInvited() {

 const navigation = useNavigate();

 const [open, setOpen] = React.useState(false);
 const [list, setList] = React.useState([0]);
 const [aswer, setAswer] = React.useState(false);

 const [table, setTable] = React.useState([0]);
 const [other, setOther] = React.useState([0]);

 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');

 const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
   right: 20,
   top: 20,
   border: `2px solid ${theme.palette.background.paper}`,
   padding: '0 4px',
  },
 }));

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

 React.useEffect(async () => {

  const docRef = doc(db, "client", secureLocalStorage.getItem("USER"));
  // Get a document, forcing the SDK to fetch from the offline cache.
  try {
   const doc = await getDocFromCache(docRef);
   // Document was found in the cache. If no cached document exists,
   setList(doc.data().grouptontine);
  } catch (e) {
   setAswer(true);
   console.log("Error getting cached document:", e);
  };

 }, []);
 React.useEffect(async () => {

  // Get a document, forcing the SDK to fetch from the offline cache.
  try {
   await onSnapshot(doc(db, "client", secureLocalStorage.getItem("USER")), (doc) => {
    // Document was found in the cache. If no cached document exists,
    setTable(doc.data().grouptontinename);
    setOther(doc.data().grouptontine);
   });

  } catch (e) {
   setOpen(true);
   console.log("Error getting cached document:", e);
  };

 }, []);

 let size = 0;

 const handleClose = () => {
  setOpen(false);
 };

 if (aswer) {
  size = 0
 } else {

  if (list === undefined) {
   size = 0
  } else {
   size = list.length;

  }

 }

 const handlepath = (event) => {
  event.preventDefault();

  if (table === undefined || !table.length === true) {
   setOpen(true);
  } else {
   window.localStorage.setItem('&&view$$list£¢ton…', JSON.stringify(table));
   window.localStorage.setItem('&&view$$list£¢toncol§§-…', JSON.stringify(other));

   window.setTimeout(() => {
    navigation('/tontine/get');
   }, 500);

  }

 };

 return (
  <>
   <div onClick={handlepath} className='tontine-send-invited'>
    <IconButton aria-label="cart">
     <StyledBadge badgeContent={size} color="secondary">
      <img src={'/img/invitation.png'} />
     </StyledBadge>
    </IconButton>
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
       Désolé, vous n'appartenez à aucun groupe Tontine
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