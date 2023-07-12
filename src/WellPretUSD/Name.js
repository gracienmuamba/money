import React from 'react';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import Media from 'react-media';
import secureLocalStorage from "react-secure-storage";

// Name withdraw sign
export default function ReturnnAme() {
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
 )
};


export const ScreenLarge = () => (
 <div className='wrp-success-withdraw-name'>
  <ViewText />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-success-withdraw-name-sm'>
  <ViewText />
 </div>
);
export const ViewText = () => {

 let pushDocs = new Array();
 const [first, setFirst] = React.useState(' ');
 const [last, setLast] = React.useState(' ');

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  const verifierCollection = pushDocs.some(value => value == secureLocalStorage.getItem("A@@ph$$&-@#"));
  const docRef = doc(db, verifierCollection ? "client" : "agent", secureLocalStorage.getItem("A@@ph$$&-@#"));

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
   setFirst(docSnap.data().firstname);
   setLast(docSnap.data().lastname);
  }

 }, []);

 return (
  <h2 className='color-or'>{`${first.toUpperCase()} ${last.toUpperCase()}`}</h2>
 );
};