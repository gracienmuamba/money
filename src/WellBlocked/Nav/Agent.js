import React from 'react';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import './Title.css';
import secureLocalStorage from "react-secure-storage";

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

  const verifierCollection = pushDocsAgent.some(value => value == secureLocalStorage.getItem("USER"));
  const docRef = doc(db, verifierCollection ? "client" : "agent", secureLocalStorage.getItem("USER"));

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
   setFirstAgent(docSnap.data().firstname === undefined ? '' : docSnap.data().firstname);
   setLastAgent(docSnap.data().lastname === undefined ? '' : docSnap.data().lastname);
  }

 }, []);

 return (
  <div className='wrp-title-print-tickets-client'>
   <h2>AGENT : </h2>
   <h2>{`${firstAgent.toUpperCase()} ${lastAgent.toUpperCase()}`}</h2>
  </div>
 );
};