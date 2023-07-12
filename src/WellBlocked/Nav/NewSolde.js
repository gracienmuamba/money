import React from 'react';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import secureLocalStorage from "react-secure-storage";

// Title Return Compoennt
export default function ReturnNewSolde() {

 let pushDocs = new Array();
 const [solde, setSolde] = React.useState(0);

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  const verifierCollection = pushDocs.some(value => value == secureLocalStorage.getItem("A@@ph$$&-@#"));
  const docRef = doc(db, verifierCollection ? "client" : "agent", secureLocalStorage.getItem("A@@ph$$&-@#"));

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
   setSolde(docSnap.data().thriftcdf);
  };

 }, []);


 return (
  <div className='wrp-title-print-tickets-client'>
   <h2>NOUVEAU SOLDE : </h2>
   <h2>{parseInt(Number(solde))} {secureLocalStorage.getItem("@unite!#!")}</h2>
  </div>
 );
};