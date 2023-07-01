import React from 'react';
import './Prix.css';
import Media from 'react-media';
import { db } from '../../../firebase';
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import './IMA.css';
import { TweenMax, Expo } from 'gsap';
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
 <div className='wrp-wallet-money'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-wallet-money'>
  <View />
 </div>
);
export const View = () => {

 let pushDocs = new Array();
 const [fc, setFc] = React.useState(0);

 React.useEffect(async () => {

  TweenMax.from('Anima', 1.2, { delay: .5, opacity: 0, y: 10, ease: Expo.easeInOut })

  const querySnapshotClient = await getDocs(collection(db, "client"));
  querySnapshotClient.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  var verifierCollection = pushDocs.some((value) => value == secureLocalStorage.getItem("USER"));

  try {
   await onSnapshot(doc(db, verifierCollection ? "client" : "agent", secureLocalStorage.getItem("USER")), (doc) => {
    setFc(doc.data().thriftcdf);
   });
  } catch {
   window.console.log(`Erreur console cdf`);
  }

 }, []);

 const decimalPart = (num) => {

  if (Number.isInteger(num)) {
   return 0;
  }

  const decimalStr = num.toString().split('.')[1];
  return Number(decimalStr);

 }

 let cdfmoney = parseInt(fc);
 let cdfdecimal = decimalPart((fc).toFixed(2));

 return (
  <div className='Anima'>
   <h3>F</h3>
   <h4 className='class-size-int'>{cdfmoney}.</h4>
   <h5 className='class-size-decimal'>{cdfdecimal}</h5>
  </div>
 );
}