import React from 'react';
import './Msg.css';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';


// Msg React from Component !!!
export default function ReturnMsg() {

 let pushDocs = new Array();
 let pushDocsAgent = new Array();

 const [first, setFirst] = React.useState(' ');
 const [last, setLast] = React.useState(' ');

 const [firstAgent, setFirstAgent] = React.useState(' ');
 const [lastAgent, setLastAgent] = React.useState(' ');

 const [solde, setSolde] = React.useState(' ');

 let phone = JSON.parse(window.localStorage.getItem('A@@ph$$&-@#'));
 let type = JSON.parse(window.localStorage.getItem('@ª©##courant**^^'));

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushDocs.push(doc.id);
  });

  const verifierCollection = pushDocs.some(value => value == JSON.parse(window.localStorage.getItem('A@@ph$$&-@#')));
  const docRef = doc(db, verifierCollection ? "client" : "agent", JSON.parse(window.localStorage.getItem('A@@ph$$&-@#')));

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
   setFirst(docSnap.data().firstname);
   setLast(docSnap.data().lastname);
   setSolde(docSnap.data().cdf);
  }

 }, []);

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
  <div className='wrp-msg-output-ticked'>

   <h1>MUUNGAOMONEY</h1>

   <h1>Client : {`${first.toUpperCase()} ${last.toUpperCase()}`}</h1>

   <h1>ID :  *********************** {phone.slice(-3)}</h1>

   <h1>Compte : {type}</h1>
   <h1>Depot :  {JSON.parse(window.localStorage.getItem('@solde!#!'))} {JSON.parse(window.localStorage.getItem('@unite!#!'))}</h1>


   <h1>Agent :  {`${firstAgent.toUpperCase()} ${lastAgent.toUpperCase()}`}</h1>

   <h1>Nouveau solde : {Number(solde)}</h1>

   <p>
    Chère Client, veuillez vérifier votre compte
    Sur notre planète forme MuunganoMoney.com
    Car la réclamation d’une transaction et permis
    Endéans 30 jours. En date d’une opération.
   </p>

   <p>
    Merci pour votre fidélité en MuunganoMoney.
   </p>

  </div>
 );
};

