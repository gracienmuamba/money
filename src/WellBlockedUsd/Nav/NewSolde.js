import React from 'react';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';

// Title Return Compoennt
export default function ReturnNewSolde() {

 let pushDocs = new Array();
 const [solde, setSolde] = React.useState(' ');

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  const verifierCollection = pushDocs.some(value => value == JSON.parse(window.localStorage.getItem('A@@ph$$&-@#')));
  const docRef = doc(db, verifierCollection ? "client" : "agent", JSON.parse(window.localStorage.getItem('A@@ph$$&-@#')));

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
   setSolde(docSnap.data().thriftusd);
  }

 }, []);
 return (
  <div className='wrp-title-print-tickets-client'>
   <h2>NOUVEAU SOLDE :</h2>
   <h2>{parseInt(Number(solde))} {JSON.parse(window.localStorage.getItem('@unite!#!'))}</h2>
  </div>
 );
};