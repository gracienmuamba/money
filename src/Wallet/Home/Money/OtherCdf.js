import React from 'react';
import './Prix.css';
import Media from 'react-media';
import { db } from '../../../firebase';
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import ReturnIMA from './IMA';


// Return CDF Components
export default function ReturnOtherCDF() {
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
 const [fc, setFc] = React.useState(0);

 React.useEffect(async () => {

  const querySnapshotClient = await getDocs(collection(db, "client"));
  querySnapshotClient.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  var verifierCollection = pushDocs.some((value) => value == JSON.parse(window.localStorage.getItem('USER')));

  try {
   await onSnapshot(doc(db, verifierCollection ? "client" : "agent", JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
    setFc(doc.data().thriftcdf);
   });
  } catch {
   window.console.log(`Erreur console cdf`);
  }

 }, []);

 return (
  <div className='flex-other-cdf'>
   <ReturnIMA IMA={'/img/franc.png'} />
   <h1>{(fc).toFixed(2)}</h1>
  </div>
 );
}