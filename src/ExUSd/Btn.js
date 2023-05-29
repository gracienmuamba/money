import React from 'react';
import { IoSend } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

let pushDocs = new Array();

// Button blocked
export default function ReturnBtn() {

 const navigation = useNavigate();
 const [state, setState] = React.useState();

 const handlepath = (event) => {
  event.preventDefault();
  window.localStorage.setItem('@ª©##', JSON.stringify(true));
  navigation('/send-usd');
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
  <button style={{ paddingLeft: '1.5em', }} onClick={handlepath} className={'Btn'}>
   <span>
    {state == "client" ? "Retrait" : "Suivant"}
   </span>
   <div><IoSend size={'1em'} color='transparent' /></div>
  </button>
 );
};