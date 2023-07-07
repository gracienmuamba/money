import React from 'react';

// Title Return Compoennt
export default function ReturnNewSolde() {

 let solde = JSON.parse(window.localStorage.getItem('@solde!#!'));
 let price = JSON.parse(window.localStorage.getItem('@!vew*%%%!!!@@@'));

 return (
  <div className='wrp-title-print-tickets-client'>
   <h2>NOUVEAU SOLDE :</h2>
   <h2>{parseInt(Number(solde) + Number(price))} {JSON.parse(window.localStorage.getItem('@unite!#!'))}</h2>
  </div>
 );
};