import React from 'react';
import './Values.css';
import Media from 'react-media';
import { doc, onSnapshot, collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import ReturnIMA from './IMA';

export let newExchAnge = 0;

// Return Value Prix
export default function ReturnValues() {
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
 <div className='wrp-values-validExh'>
  <ViewExchAnge />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-values-validExh-sm'>
  <ViewExchAnge />
 </div>
);
export const ViewExchAnge = () => {

 const [status, setStatus] = React.useState('agent');
 const pushArray = new Array();

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushArray.push(doc.id);
  });
  const verifier = pushArray.some(value => value == JSON.parse(window.localStorage.getItem('USER')));

  try {
   await onSnapshot(doc(db, verifier ? "client" : "agent", JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
    setStatus(doc.data().state);
   });
  } catch {
   window.console.log('window error');
  }

 }, []);

 newExchAnge = JSON.parse(window.localStorage.getItem('@solde!#!'));
 window.localStorage.setItem('@EX##&Bº', JSON.stringify(newExchAnge));

 let number = newExchAnge;
 number = (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ')

 return (
  <h2>
   <ReturnIMA IMA={'/img/franc.png'} />
   <span>{number}</span>
  </h2>
 );
};