import React from 'react';
import './Swap.css';
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';
import Media from 'react-media';
import moment from 'moment';

import secureLocalStorage from "react-secure-storage";

// Prix HeAd 
export default function ReturnBalance() {
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
     {matches.medium && <ScreenMedium />}
     {matches.large && <ScreenLarge />}
    </>
   )}
  </Media>
 );
};

export const ScreenLarge = () => (
 <div className='wrp-main-swap-dashed'>
  <View />
 </div>
);
export const ScreenMedium = () => (
 <div className='wrp-main-swap-dashed-md'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-main-swap-dashed-sm'>
  <View />
 </div>
);

export const View = () => {

 let pushDocs = new Array();

 const [use, setUse] = React.useState('');
 const [monnais, setMonnais] = React.useState(0);

 const [unity, setUnity] = React.useState('');
 const [delay, setDelay] = React.useState(null);
 const [frAis, setFrAis] = React.useState(0);

 const [type, setType] = React.useState('');
 const [comm, setComm] = React.useState(0);

 const [status, setStatus] = React.useState(null);

 React.useEffect(async () => {

  const querySnapshotClient = await getDocs(collection(db, "client"));
  querySnapshotClient.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  var verifierCollection = pushDocs.some((value) => value == secureLocalStorage.getItem("USER"));

  try {
   await onSnapshot(doc(db, verifierCollection ? "client" : "agent", secureLocalStorage.getItem("USER")), (doc) => {
    setUse(doc.data().user);
    setMonnais(doc.data().money);
    setUnity(doc.data().unite);
    setDelay(doc.data().delay);
    setFrAis(doc.data().frais);
    setStatus(doc.data().state);
    setType(doc.data().sendtype);
    setComm(doc.data().commission);
   });
  } catch {
   window.console.log(`Erreur console cdf`);
  }

 }, []);

 const numfrAis = frAis;
 const str2 = type.charAt(0).toUpperCase() + type.slice(1);

 return (
  <>
   <div className='box-swap-title'>
    <h2>Transféré</h2>
    <span>{str2} {(monnais).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ')} {unity}</span>
   </div>

   <div className='box-swap-title'>
    <h2>Identiter</h2>
    <span>{use.toLowerCase()}</span>
   </div>


   <div className='box-swap-title'>
    <h2>Frais</h2>
    <span>{(numfrAis).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ')} {unity}</span>
   </div>

   {status === 'agent' &&
    <div className='box-swap-title'>
     <h2>Commission</h2>
     <span>{(comm.toFixed(2))} {unity}</span>
    </div>
   }
   <div className='box-swap-title'>
    <h2>Date</h2>
    <span>{moment(delay).locale('fr').format('LLL')}</span>
   </div>
  </>
 );
};