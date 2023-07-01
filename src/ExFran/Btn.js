import React from 'react';
import { IoSend } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import secureLocalStorage from "react-secure-storage";

let pushDocs = new Array();


// Button blocked
export default function ReturnBtn() {

 const [state, setState] = React.useState();
 const navigation = useNavigate();

 const handlepath = (event) => {
  event.preventDefault();
  window.localStorage.setItem('@ª©##', JSON.stringify(true));
  window.localStorage.setItem('@ª©##courant**^^', JSON.stringify('Courant'));
  navigation('/send-fc');
 };

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushDocs.push(doc.id);
  });
  const verifier = pushDocs.some(value => value == secureLocalStorage.getItem("USER"));

  const docRef = doc(db, verifier ? "client" : "agent", secureLocalStorage.getItem("USER"));
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
   setState(docSnap.data().state)
  }

 }, []);

 return (
  <button style={{ paddingLeft: '1.5em' }} onClick={handlepath} className={'Btn'}>
   <span>
    {state == "client" ? "Retrait" : "Suivant"}
   </span>
   <div><IoSend size={'1.5em'} color={'transparent'} /></div>
  </button>
 );
};