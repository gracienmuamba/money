import React from 'react';
import './Budget.css';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';
import currency from 'currency.js';


// Budget Main
export default function ReturnBudgeT() {

 let colTon = JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil'));
 let [money, setMoney] = React.useState(0);
 let [devise, setDevise] = React.useState('');

 React.useEffect(async () => {

  const unsub = onSnapshot(doc(db, 'tontine', colTon), (doc) => {
   setMoney(doc.data().asked);
   setDevise(doc.data().currency);

  });
 }, []);

 var euro = value => currency(value, { separator: ' ', decimal: '.', symbol: '' });
 return (
  <div className='wrp-tontine-budget'>
   <h2>
    {devise === 'USD' ? '$ ' : 'F '}
    {euro(money).format()}
   </h2>

   <p>Ensemble de tout le dépôt</p>
   <img src={'/img/money-bag.png'} />
  </div>
 );
};