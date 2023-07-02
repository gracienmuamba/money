import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';

import { db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { HiArrowLeft } from 'react-icons/hi';
import secureLocalStorage from "react-secure-storage";

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


export async function getSearchColumn(col) {

 let pushDoc = new Array();

 const querySnapshot = await getDocs(collection(db, `${col}`));
 querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  pushDoc.push(doc.data());
 });

 let arr = pushDoc.sort((a, b) => { return a.date - b.date })
 window.localStorage.setItem('%%docs&&col**unite', JSON.stringify(arr.reverse()));

};
export function BacK() {
 const navigation = useNavigate();
 return (
  <div className='wrp-back-brokers'>
   <div onClick={() => navigation(-1)} className='wrp-back-box-brokers'>
    <HiArrowLeft size={'1.3em'} color={'grey'} />
   </div>
  </div>
 );
};

// NavBar component view 
export default function ReturnNavBaR() {

 let pushDoc = new Array();

 const [load, setLoad] = React.useState(false);
 const navigation = useNavigate();
 const [unite, setUnite] = React.useState([]);

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, `${'unite' + secureLocalStorage.getItem("USER")}`));
  querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   pushDoc.push(doc.data());

  });
  setUnite(pushDoc);

 }, []);

 const handlepath = async (event) => {

  event.preventDefault();
  window.console.log(unite);

  setLoad(true);

  let arr = unite.sort((a, b) => { return a.date - b.date })
  window.localStorage.setItem('%%docs&&col**unite', JSON.stringify(arr.reverse()));

  window.setTimeout(() => {
   navigation('/brokers/unite/cmd');
  }, 3000);
 }

 return (
  <>
   <div className='zindex-theme'>
    <Backdrop
     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
     open={load}>

     <CircularProgress color="inherit" />
    </Backdrop>
   </div>

   <div className='navbar-top-broker'>
    <nav>

     <Tooltip title="Retour">
      <IconButton>
       <BacK />
      </IconButton>
     </Tooltip>

     <img src={'/img/caise.png'} onClick={handlepath} />

    </nav>
   </div>

  </>
 );
};

