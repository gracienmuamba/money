import React from 'react';
import './Prix.css';
import Media from 'react-media';
import { db } from '../../../firebase';
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import ReturnIMA from './IMA';
import secureLocalStorage from "react-secure-storage";

// Return CDF Components
export default function ReturnOtherUsd() {
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
 <View />
);
export const ScreenSmall = () => (
 <View />
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

 return (
  <div className='flex-other-cdf'>
   <ReturnIMA IMA={'/img/dollars.png'} />
   <h1>{(usd).toFixed(2)}</h1>
  </div>
 );
}