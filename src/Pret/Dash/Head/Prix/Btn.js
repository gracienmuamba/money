import React from 'react';
import './Btn.css';
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from '../../../../firebase';

import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from "react-secure-storage";


// Btn Component view 
export default function ReturnBTn() {

 const navigation = useNavigate();

 const [cdf, setCdf] = React.useState(0.00);
 const [usd, setUsd] = React.useState(0.00);
 const [time, setTime] = React.useState(' ');

 const [walletusd, setWalletusd] = React.useState(0.00);
 const [walletcdf, setWalletcdf] = React.useState(0.00);


 const [soldecdf, setSoldecdf] = React.useState(0);
 const [soldeusd, setSoldeusd] = React.useState(0);

 React.useEffect(async () => {

  try {
   await onSnapshot(doc(db, "pret", secureLocalStorage.getItem("USER")), (doc) => {

    setSoldecdf(doc.data().cdf);
    setSoldeusd(doc.data().usd);

   });
  } catch {
   window.console.log(`Erreur`);
  }

 }, []);


 let moneycdf = new Intl.NumberFormat('en-US').format(soldecdf);
 let moneyusd = new Intl.NumberFormat('en-US').format(soldeusd);

 let commacdf = moneycdf.split('.');
 let commausd = moneyusd.split('.');

 let franComma = commacdf[1] == undefined ? 0 : commacdf[1];
 let DollarComma = commausd[1] == undefined ? 0 : commausd[1];
 let Comma = Number(franComma) + Number(DollarComma);

 let solde = Number(parseInt(soldecdf)) + Number(parseInt(soldeusd));

 React.useEffect(async () => {

  try {
   await onSnapshot(doc(db, "pret", secureLocalStorage.getItem("USER")), (doc) => {

    setCdf(doc.data().pretcdf);
    setUsd(doc.data().pretusd);
    setTime(doc.data().date);
   });
  } catch {
   window.console.log(`Erreur`);
  }

 }, []);
 React.useEffect(async () => {

  try {
   await onSnapshot(doc(db, "client", secureLocalStorage.getItem("USER")), (doc) => {
    setWalletusd(doc.data().usd);
    setWalletcdf(doc.data().cdf);
   });
  } catch {
   window.console.log(`Erreur`);
  }

 }, []);


 var now = moment(); //todays date

 let year = moment(time).get('year');
 let months = moment(time).get('month');
 let days = moment(time).get('date');
 var end = moment([year, months, days]); // another date

 var duration = moment.duration(now.diff(end));
 var day = duration.asDays();

 let pretCdf = cdf;
 let modulecdf = 0;
 let pourcentage = JSON.parse(window.localStorage.getItem('%%pret-*%'));

 for (let index = 0; index <= parseInt(day); index++) {
  if (index === 0) {
   continue;

  } else {

   modulecdf = (pretCdf * pourcentage / 100);
   pretCdf += modulecdf;
  }

 };

 let yearusd = moment(time).get('year');
 let monthsusd = moment(time).get('month');
 let daysusd = moment(time).get('date');
 var end = moment([yearusd, monthsusd, daysusd]); // another date

 var duration = moment.duration(now.diff(end));
 var dayusd = duration.asDays();

 let pretUsd = usd;
 let moduleusd = 0;

 for (let index = 0; index <= parseInt(dayusd); index++) {
  if (index === 0) {
   continue;

  } else {
   moduleusd = (pretUsd * pourcentage / 100);
   pretUsd += moduleusd;

  }
 };


 const handlepathcdf = (event) => {

  event.preventDefault();

  secureLocalStorage.setItem("&&money::pret__", pretCdf);
  secureLocalStorage.setItem("&&money::wallet__", walletcdf);
  secureLocalStorage.setItem("&&money::unite__", 'cdf');
  secureLocalStorage.setItem("^^pret->", true);


  if (solde <= 0 && Comma <= 10) {
   secureLocalStorage.setItem("^^pret->ok", true);
   asKedpret();
  } else {
   window.console.log('next');
  }

  secureLocalStorage.setItem("solde&&%%¢pret", '/pret/costs/asked/cdf');
  navigation('/pret/method');
 }
 const handlepathusd = (event) => {

  event.preventDefault();

  secureLocalStorage.setItem("&&money::pret__", pretUsd);
  secureLocalStorage.setItem("&&money::wallet__", walletusd);
  secureLocalStorage.setItem("&&money::unite__", 'usd');
  secureLocalStorage.setItem("^^pret->", true);

  if (solde <= 0 && Comma <= 10) {
   secureLocalStorage.setItem("^^pret->ok", true);
   asKedpret();
  } else {
   window.console.log('continue');

  }

  secureLocalStorage.setItem("solde&&%%¢pret", '/pret/costs/asked/usd');
  navigation('/pret/method');

 };

 // window.console.log(moment(time).format() < moment(time).add(120, 'days').format());

 return (
  <>
   {moment(time).add(2, 'days').format() > moment(time).format() &&
    <>
     {
      usd > 0 &&
      <div className='btn-pret-asked'>
       <button onClick={handlepathusd}>Remboursé</button>
      </div>
     }
    </>
   }

   {
    moment(time).add(2, 'days').format() > moment(time).format() &&
    <>
     {
      cdf > 0 &&
      <div className='btn-pret-asked'>
       <button onClick={handlepathcdf}>Remboursé</button>
      </div>
     }
    </>
   }
  </>
 );
};

// add pret for client
export async function asKedpret() {
 const washingtonRef = doc(db, "client", secureLocalStorage.getItem("USER"));
 // Set the "capital" field of the city 'DC'
 await updateDoc(washingtonRef, {
  pret: false,
  pretactive: false,
  pretregister: false
 });

};

