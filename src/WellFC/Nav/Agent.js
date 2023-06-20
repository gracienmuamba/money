import React from 'react';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';

// Title Return Compoennt
export default function ReturnNameAgent() {

 let pushDocs = new Array();
 let pushDocsAgent = new Array();

 const [firstAgent, setFirstAgent] = React.useState(' ');
 const [lastAgent, setLastAgent] = React.useState(' ');

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  const verifierCollection = pushDocsAgent.some(value => value == JSON.parse(window.localStorage.getItem('USER')));
  const docRef = doc(db, verifierCollection ? "client" : "agent", JSON.parse(window.localStorage.getItem('USER')));

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
   setFirstAgent(docSnap.data().firstname);
   setLastAgent(docSnap.data().lastname);
  }

 }, []);

 return (
  <div className='wrp-title-print-tickets-client'>
   <h2>Agent : </h2>
   <h2>{`${firstAgent.toUpperCase()} ${lastAgent.toUpperCase()}`}</h2>
  </div>
 );
};