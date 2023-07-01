import React from 'react';
import './Small.css';
import Media from 'react-media';
import { db } from '../../../firebase';
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import secureLocalStorage from "react-secure-storage";

// Return CDF Components
export default function ReturnCDF() {
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
 <div className='slide-money-small'>
  <div></div>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='slide-money-small'>
  <div></div>
  <View />
 </div>
);
export const View = () => {

 let pushDocs = new Array();
 const [usd, setUsd] = React.useState(0);

 React.useEffect(async () => {

  const querySnapshotClient = await getDocs(collection(db, "client"));
  querySnapshotClient.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  var verifierCollection = pushDocs.some((value) => value == secureLocalStorage.getItem("USER"));

  try {
   await onSnapshot(doc(db, verifierCollection ? "client" : "agent", secureLocalStorage.getItem("USER")), (doc) => {
    setUsd(doc.data().thriftusd);
   });
  } catch {
   window.console.log(`Erreur console cdf`);
  }

 }, []);

 let money = (usd).toFixed(2);

 return (
  <div>
   <p><img src={'/img/dollars.png'} alt='dollars' /> {money}</p>
  </div>
 );
}