import React from 'react';
import Media from 'react-media';
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import secureLocalStorage from "react-secure-storage";


let arrayClient = new Array();

// Avatar IMAGE VIew
export default function ReturnAvataR() {
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
  <div className='avatar-circle-flags'>
   <FirstLetteR />
  </div>
 );
}
export const ScreenSmall = () => (
 <div className='avatar-circle-flags'>
  <FirstLetteR />
 </div>
);
export const FirstLetteR = () => {

 const [profil, setProfil] = React.useState(null);

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   arrayClient.push(doc.id);
  });

  const collections = arrayClient.some(value => value == secureLocalStorage.getItem("A@@ph$$&-@#"));
  const unsub = onSnapshot(doc(db, collections ? "client" : "agent", secureLocalStorage.getItem("A@@ph$$&-@#")), (doc) => {
   setProfil(doc.data().profile);
  });

 }, []);

 return (
  <div className='wrp-firstchar-avatar'>
   <img src={profil} />
  </div>
 );
}
