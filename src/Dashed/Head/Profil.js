import React from 'react';
import './Profil.css';
import Media from 'react-media';
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';
import ReturnName from './Name';
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
  <div className='profil-dashed'>
   <View />
   <ReturnName />
  </div>
 );
}
export const ScreenSmall = () => (
 <div className='profil-dashed'>
  <View />
  <ReturnName />
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
  <img src={profil} />
 );
};