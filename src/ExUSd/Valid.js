import React from 'react';
import './Valid.css';
import Media from 'react-media';
import { collection, getDocs, onSnapshot, doc } from "firebase/firestore";
import { db } from '../firebase';

import ReturnBtnBlocKed from './BtnBlocked';
import ReturnBtn from './Btn';


let pushDocs = new Array();

// Blocked View Arrow
export default function ReturnBtnValid() {
 return (
  <Media
   queries={{
    small: '(max-width: 599px)',
    medium: '(min-width: 600px) and (max-width:1199px)',
    large: '(min-width: 1200px)',
   }}>
   {matches => (
    <>
     {matches.small && <ScreenSmAll />}
     {matches.medium && <ScreenLaRge />}
     {matches.large && <ScreenLaRge />}
    </>
   )}
  </Media>
 );
};

export const ScreenLaRge = () => (
 <div className='wrp-valide-exh'>
  <ViewBtn />
 </div>

);
export const ScreenSmAll = () => (
 <div className='wrp-valide-exh-sm'>
  <ViewBtn />
 </div>
);
export const ViewBtn = () => {
 const [checked, setChecked] = React.useState(null);

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   pushDocs.push(doc.id);
  });

  const collections = pushDocs.includes(JSON.parse(window.localStorage.getItem('USER')));
  const unsub = onSnapshot(doc(db, collections ? "client" : "agent", JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
   setChecked(doc.data().state);
  });

 }, []);

 return (
  <>
   {checked == 'client' && <ReturnBtn />}
   {checked == 'agent' &&
    <>
     <ReturnBtn />
     <ReturnBtnBlocKed />
    </>
   }
  </>
 )
};