import React from 'react';
import './View.css';
import { useNavigate } from 'react-router-dom';

import { db } from '../../../../firebase';
import { collection, getDocs } from "firebase/firestore";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import secureLocalStorage from "react-secure-storage";

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

// View Pret Component 
export default function ReturnViEw() {

 let pushDoc = new Array();

 const [load, setLoad] = React.useState(false);
 const navigation = useNavigate();
 const [unite, setUnite] = React.useState([]);

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, `${'pret' + secureLocalStorage.getItem("USER")}`));
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
  window.localStorage.setItem('%%docs&&col**pret', JSON.stringify(arr.reverse()));

  window.setTimeout(() => {
   navigation('/pret/reimburse');
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

   <div className='view-pret-icon-cmd'>
    <img onClick={handlepath} src={'/img/view-pret.png'} />
   </div>
  </>
 );

}