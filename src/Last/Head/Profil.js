import React from 'react';
import Media from 'react-media';
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import ReturnName from './Name';
import { db } from '../../firebase';
import secureLocalStorage from "react-secure-storage";


// Avatar IMAGE VIew
export default function ReturnProfil() {
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

export const ScreenLarge = () => {
 return (
  <div className='profil-wallet-navs'>
   <View />
  </div>
 );
}
export const ScreenSmall = () => (
 <div className='profil-wallet-navs'>
  <View />
 </div>
);
export const View = () => {

 let arrayClient = new Array();
 const [profil, setProfil] = React.useState(null);

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   arrayClient.push(doc.id);
  });

  const collections = arrayClient.some(value => value == secureLocalStorage.getItem("USER"));

  const unsub = onSnapshot(doc(db, collections ? "client" : "agent", secureLocalStorage.getItem("USER")), (doc) => {
   setProfil(doc.data().profile);
  });

 }, []);

 return (
  <div>
   <ReturnName />
   <img src={profil} />
  </div>
 );
};