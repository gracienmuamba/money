import React from 'react';
import './Btn.css';
import Media from 'react-media';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import { useNavigate } from 'react-router-dom';
import secureLocalStorage from "react-secure-storage";



// Btn view component 
export default function ReturnBtn() {
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
 <div className='tontine-btn-next'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='tontine-btn-next-sm'>
  <View />
 </div>
);


export function View() {

 const navigation = useNavigate();

 const [open, setOpen] = React.useState(false);
 const [list, setList] = React.useState([0]);
 const [other, setOther] = React.useState([0]);

 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');

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

 const handleClose = () => {
  setOpen(false);
 };

 React.useEffect(async () => {

  // Get a document, forcing the SDK to fetch from the offline cache.
  try {
   await onSnapshot(doc(db, "client", JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
    // Document was found in the cache. If no cached document exists,
    setList(doc.data().grouptontinename);
    setOther(doc.data().grouptontine);
   });

  } catch (e) {
   setOpen(true);
   console.log("Error getting cached document:", e);
  };

 }, []);

 const handlepath = (event) => {

  event.preventDefault();
  window.localStorage.setItem('prix^^&&not**', JSON.stringify(false));
  window.localStorage.setItem('^^add&&@!!**', JSON.parse(false));
  window.localStorage.setItem('??next^^**$$', JSON.parse(false));


  if (list === undefined || !list.length === true) {
   setOpen(true);
  } else {

   window.localStorage.setItem('&&view$$list£¢ton…', JSON.stringify(list));
   window.localStorage.setItem('&&view$$list£¢toncol§§-…', JSON.stringify(other));

   window.setTimeout(() => {
    navigation('/tontine/list/group');
   }, 500);
  }

 };


 return (
  <>
   <button onClick={handlepath}>Continue sur Tontine</button>
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
 )
};