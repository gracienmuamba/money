import React from 'react';
import Media from 'react-media';
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';
import secureLocalStorage from "react-secure-storage";


//  Exchange View Name
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
     {matches.small && <ScreenSmall />}
     {matches.medium && <ScreenLarge />}
     {matches.large && <ScreenLarge />}
    </>
   )}
  </Media>
 );
};

export const ScreenLarge = () => (
 <div className='name-head-wallet-slide'>
  <ReturnPeople />
 </div>
);
export const ScreenSmall = () => (
 <div className='name-head-wallet-slide'>
  <ReturnPeople />
 </div>
);
export const ReturnPeople = () => {

 let pushDocsA = new Array();
 const [last, setLast] = React.useState('');
 const [status, setStatus] = React.useState('');
 const [team, setTeam] = React.useState('');

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushDocsA.push(doc.id);
  });

  const verifierCollection = pushDocsA.some(value => value == secureLocalStorage.getItem("USER"));

  try {
   const unsub = onSnapshot(doc(db, verifierCollection ? "client" : "agent", secureLocalStorage.getItem("USER")), (doc) => {
    setLast(doc.data().lastname);
    setStatus(doc.data().state);
    setTeam(doc.data().team);
   });

  } catch {
   window.console.log('error window');
  }

 }, []);

 // const str = last.toLowerCase() + ' ' + first.toLowerCase();
 const str2 = last.charAt(0).toUpperCase() + last.slice(1);

 let stateName = '';

 if (status === 'agent' && team === 'mere') {
  stateName = 'Super Agent';
 } else if (status === 'agent' && team === 'simple') {
  stateName = 'Agent';
 } else {
  stateName = 'Client';
 }

 return (
  <h2 style={{ color: 'white' }}>{str2}</h2>
 )
};