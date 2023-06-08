import React from 'react';
import './Prix.css';
import Media from 'react-media';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';
import currency from 'currency.js';
import Skeleton from '@mui/material/Skeleton';


// Print view Asked
export default function ReturnPrix() {
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
 <div className='wrp-prix-quote-withdraw'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-prix-quote-withdraw-sm'>
  <View />
 </div>
);
export const View = () => {

 const [asked, setAsked] = React.useState(false);
 const [devise, setDevise] = React.useState('');

 React.useEffect(async () => {

  try {
   const unsub = onSnapshot(doc(db, JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil')), JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
    setAsked(doc.data().asked);
   });

  } catch (error) {
   window.console.log(error);
  }

 }, []);
 React.useEffect(async () => {
  try {
   const unsub = onSnapshot(doc(db, 'tontine', JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil'))), (doc) => {
    setDevise(doc.data().currency);
   });
  } catch (error) {
   window.console.log(error);
  }

 }, []);

 var euro = value => currency(value, { separator: ' ', decimal: '.', symbol: '' });
 return (
  <>
   {asked === false && <Skeleton variant="rectangular" width={310} height={60} />}
   {asked !== false && <p> {euro(asked).format()} {devise}</p>}
  </>
 );
};