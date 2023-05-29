import React from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';
import './Prix.css';
import currency from 'currency.js';


const ReturnPrix = (props) => {

 let docTon = JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil'));

 const [rising, setRising] = React.useState(0);
 const [devise, setDevise] = React.useState('');
 const [active, setActive] = React.useState(null);


 React.useEffect(async () => {

  await onSnapshot(doc(db, 'tontine', docTon), (doc) => {
   setRising(doc.data().rising);
   setDevise(doc.data().currency);
  });
  const unsub = onSnapshot(doc(db, docTon, props.docTonUser), (doc) => {
   setActive(doc.data().soldeactive);
  });

 }, []);

 var euro = value => currency(value, { separator: ' ', decimal: '.', symbol: '' });
 return (
  <div className='profil-tontine-navs-prix'>
   <h4 style={{ color: active && '#38b000' }}>
    {active && true ? euro(rising).format() : euro(0).format()}
    {devise === 'usd' ? ' USD' : ' CDF'}
   </h4>
  </div>
 );
};

export default ReturnPrix;
