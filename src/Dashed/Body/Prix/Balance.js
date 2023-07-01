import React from 'react';
import './Balance.css';
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';
import Media from 'react-media';

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
     {matches.medium && <ScreenLarge />}
     {matches.large && <ScreenLarge />}
    </>
   )}
  </Media>
 );
};

export const ScreenLarge = () => (
 <div className='wrp-main-prix-dashed'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-main-prix-dashed-sm'>
  <View />
 </div>
);
export const View = () => {

 let pushDocs = new Array();

 const [fc, setFc] = React.useState(0);
 const [usd, setUsd] = React.useState(0);

 React.useEffect(async () => {

  const querySnapshotClient = await getDocs(collection(db, "client"));
  querySnapshotClient.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  var verifierCollection = pushDocs.some((value) => value == secureLocalStorage.getItem("USER"));

  try {

   const unsub = onSnapshot(doc(db, verifierCollection ? "client" : "agent", secureLocalStorage.getItem("USER")), (doc) => {
    // Document was found in the cache. If no cached document exists,
    setFc(doc.data().cdf);
    setUsd(doc.data().usd);
   });

  } catch (error) {

   setFc(0);
   setUsd(0);

  }

 }, []);

 return (
  <>
   <span>{(usd).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ')} USD</span>
   <span>{(fc).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ')} CDF</span>
  </>
 )
}