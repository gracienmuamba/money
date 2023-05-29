import React from 'react';
import './Name.css';
import { IoIosPerson } from 'react-icons/io';
import Media from 'react-media';

import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';

// This is Name view 
export default function ReturnName() {
 return (
  <Media
   queries={{
    small: '(max-width: 599px)',
    medium: '(min-width: 600px) and (max-width:1199px)',
    large: '(min-width: 1200px)',
   }}>
   {matches => (
    <>
     {matches.small && <ScreenLarge />}
     {matches.medium && <ScreenLarge />}
     {matches.large && <ScreenLarge />}
    </>
   )}
  </Media>
 );
};


export const ScreenLarge = () => (
 <div className='wrp-name-profil'>
  <div className='wrp-boxname-profil'>
   <IoIosPerson size={'2em'} color={'grey'} />

   <div className='profil-name-identity'>
    <h1>Nom et Prénom</h1>
    <ReturnPeople />
    <ViewText />
   </div>
  </div>

 </div>
);
export const ViewText = () => (
 <p>Nom du compte avec MuunganoMoney est utilisateur.</p>
);
export const ReturnPeople = () => {

 let arrayClient = new Array();
 const [first, setFirst] = React.useState('');
 const [last, setLast] = React.useState('');

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   arrayClient.push(doc.id);
  });

  let collections = arrayClient.some(x => x == JSON.parse(window.localStorage.getItem('USER')));

  try {
   await onSnapshot(doc(db, collections ? "client" : "agent", JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
    setFirst(doc.data().firstname);
    setLast(doc.data().lastname);
   });

  } catch {
   window.console.log(`Erreur disponible`);
  }

 }, []);

 return (
  <h2>{first.toLowerCase()} {last.toLowerCase()}</h2>
 );
};