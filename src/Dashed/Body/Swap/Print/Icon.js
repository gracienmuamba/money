import React from 'react';
import './Icon.css';
import IconButton from '@mui/material/IconButton';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import { db } from '../../../../firebase';
import { doc, collection, getDocs, getDocFromCache } from "firebase/firestore";
import ReturnMsg from './Msg';

import { useNavigate } from 'react-router-dom';


let pushDocs = new Array();


// view invite component
export default function ReturnIconPrinT() {

 const [open, setOpen] = React.useState(false);
 const [list, setList] = React.useState([]);
 const navigation = useNavigate();

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

  const querySnapshotClient = await getDocs(collection(db, "client"));
  querySnapshotClient.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  var verifierCollection = pushDocs.some((value) => value == JSON.parse(window.localStorage.getItem('USER')));
  const docRef = doc(db, verifierCollection ? "client" : "agent", JSON.parse(window.localStorage.getItem('USER')));
  // Get a document, forcing the SDK to fetch from the offline cache.
  try {
   const doc = await getDocFromCache(docRef);
   // Document was found in the cache. If no cached document exists,
   setList(doc.data().swap);
  } catch (e) {
   console.log("Error getting cached document:", e);
  };

 }, []);

 const handlepath = (event) => {
  event.preventDefault();
  navigation('/muungano/print/ticket');
 };

 let col = pushDocs.includes(JSON.parse(window.localStorage.getItem('USER')));

 return (
  <>
   <div className='tontine-nav-invited-icon-dash'>
    {!col &&
     <div onClick={handlepath}>
      <IconButton>
       <img src={'/img/printing.png'} />
      </IconButton>
     </div>
    }
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