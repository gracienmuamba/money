import React from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';
import './LastName.css';


const ReturnLasTName = (props) => {

 let docTon = JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil'));
 const [name, setName] = React.useState('');
 const [active, setActive] = React.useState(null);

 React.useEffect(async () => {

  await onSnapshot(doc(db, 'client', props.docName), (doc) => {
   setName(doc.data().lastname);
  });

  const unsub = onSnapshot(doc(db, docTon, props.docName), (doc) => {
   setActive(doc.data().soldeactive);
  });

 }, []);

 return (
  <div className='profil-tontine-navs'>
   <h4 style={{ color: active && '#38b000' }}>{name.charAt(0).toUpperCase() + name.slice(1)}</h4>
  </div>
 );
};

export default ReturnLasTName;
