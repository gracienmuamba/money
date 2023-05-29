import * as React from 'react';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';
import ReturnName from './Name';
import './IMA.css';
import Media from 'react-media';


let arrayClient = new Array();
let pushDocs = new Array();


// Avatar IMAGE VIew
export default function ReturnAvataR() {
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

export const ScreenLarge = () => {
 return (
  <div className='profil-pret'>
   <FirstLetteR />
  </div>
 );
}
export const ScreenSmall = () => (
 <div className='profil-pret'>
  <FirstLetteR />
 </div>
);
export const FirstLetteR = () => {

 const [profil, setProfil] = React.useState(null);
 const [pret, setPret] = React.useState(false);

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  try {
   const unsub = onSnapshot(doc(db, "client", JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
    setPret(doc.data().pret);
   });
  } catch {
   window.console.log('error');
  }

 }, []);
 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   arrayClient.push(doc.id);
  });

  // const collections = arrayClient.some(value => value == JSON.parse(window.localStorage.getItem('USER')));
  const collections = arrayClient.includes(JSON.parse(window.localStorage.getItem('USER')));
  const unsub = onSnapshot(doc(db, collections ? "client" : "agent", JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
   setProfil(doc.data().profile);
  });

 }, []);

 return (
  <div className='profil-pret-flex'>

   <Stack direction="row" spacing={2}>

    <Badge
     overlap="circular"
     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
     badgeContent={

      pret === true &&

      <div className='flex-badge-ima'>
       <img src={'/img/pret-valid.png'} />
      </div>

     }>
     <img src={profil} />
    </Badge>


   </Stack>

   <ReturnName />
  </div>
 );
};
