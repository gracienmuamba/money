import React from 'react';
import './Phone.css';
import { FcAddressBook } from 'react-icons/fc';
import Media from 'react-media';

import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import secureLocalStorage from "react-secure-storage";

// This is Name view 
export default function ReturnPhoneSetting() {
 return (
  <Media
   queries={{
    small: '(max-width: 599px)',
    medium: '(min-width: 600px) and (max-width:1199px)',
    large: '(min-width: 1200px)',
   }}>
   {matches => (
    <>
     {matches.small && <ScreenLarge />}
     {matches.medium && <ScreenLarge />}
     {matches.large && <ScreenLarge />}
    </>
   )}
  </Media>
 );
};

export const ScreenLarge = () => (

 <div className='wrp-name-profil'>
  <div className='wrp-boxname-profil'>
   <FcAddressBook size={'2em'} color={'grey'} />

   <div className='profil-name-identity'>
    <h1>Télèphone et Email</h1>
    <PhoneView />
    <ViewText />
   </div>
  </div>
 </div>
);
export const ViewText = () => (
 <p>Télèphone utilisateur avec MuunganoMoney compte .</p>
);
export const PhoneView = () => {

 const [numPhone, setNumPhone] = React.useState();
 const [email, setEmail] = React.useState();
 let pushDocs = new Array();

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  let collections = pushDocs.some(x => x == secureLocalStorage.getItem("USER"));
  const docRef = doc(db, collections ? 'client' : 'agent', secureLocalStorage.getItem("USER"));
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
   setNumPhone((docSnap.data().phone))
   setEmail((docSnap.data().email))
  }
 }, []);

 return (
  <>
   <h2>{numPhone}</h2>
   <h2>{email}</h2>
  </>
 )
};
