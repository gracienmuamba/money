import React from 'react';
import Media from 'react-media';
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';


//  Exchange View Name
export default function ReturnName() {
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
 <div className='wrp-name-exchange'>
  <ReturnPeople />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-name-exchange'>
  <ReturnPeople />
 </div>
);
export const ReturnPeople = () => {

 let pushDocsA = new Array();

 const [first, setFirst] = React.useState('');
 const [last, setLast] = React.useState('');

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushDocsA.push(doc.id);
  });

  const verifierCollection = pushDocsA.some(value => value == JSON.parse(window.localStorage.getItem('A@@ph$$&-@#')));

  try {
   const unsub = onSnapshot(doc(db, verifierCollection ? "client" : "agent", JSON.parse(window.localStorage.getItem('A@@ph$$&-@#'))), (doc) => {
    setFirst(doc.data().firstname);
    setLast(doc.data().lastname);
   });

  } catch {
   window.console.log('error window');
  }



 }, []);

 return (
  <h2 className='color-or'>{first.toUpperCase()} {last.toUpperCase()}</h2>
 )
};