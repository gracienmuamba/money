import React from 'react';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import './Client.css';
import secureLocalStorage from "react-secure-storage";

// Title Return Compoennt
export default function ReturnNameClienT() {

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
  <div className='wrp-title-print-tickets-client'>
   <h2>CLIENT : </h2>
   <h2> {`${first.toUpperCase()} ${last.toUpperCase()}`}</h2>
  </div>
 );
};