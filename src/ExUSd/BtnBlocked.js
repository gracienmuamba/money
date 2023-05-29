import React from 'react';
import { FcLock } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

let pushDocs = new Array();

// Button blocked
export default function ReturnBtnBlocKed() {

 const [state, setState] = React.useState();
 const navigation = useNavigate();
 const handlepath = (event) => {
  event.preventDefault();
  window.localStorage.setItem('@ª©##', JSON.stringify(true));
  navigation('/send-blocked-usd');
 };

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushDocs.push(doc.id);
  });
  const verifier = pushDocs.some(value => value == JSON.parse(window.localStorage.getItem('USER')));

  const docRef = doc(db, verifier ? "client" : "agent", JSON.parse(window.localStorage.getItem('USER')));
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
   setState(docSnap.data().state)
  }

 }, []);

 return (
  <button onClick={handlepath} className='Btn-Closed margin-top-btn'>
   <span>
    {state == "client" ? "Retrait" : "Suivant"}
   </span>
   <div><FcLock size={'1.3em'} /></div>
  </button>
 );
};