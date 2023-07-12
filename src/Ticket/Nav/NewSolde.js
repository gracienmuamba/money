import React from 'react';
import secureLocalStorage from "react-secure-storage";


// Title Return Compoennt
export default function ReturnNewSolde() {

 let solde = secureLocalStorage.getItem("@solde!#!");
 let price = JSON.parse(window.localStorage.getItem('@!vew*%%%!!!@@@'));

 return (
  <div className='wrp-title-print-tickets-client'>
   <h2>NOUVEAU SOLDE :</h2>
   <h2>{parseInt(Number(solde) + Number(price))} {secureLocalStorage.getItem("@unite!#!")}</h2>
  </div>
 );
};