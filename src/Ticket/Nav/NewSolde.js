import React from 'react';

// Title Return Compoennt
export default function ReturnNewSolde() {

 let newSolde = JSON.parse(window.localStorage.getItem('@!vew*%%%!!!@@@'));
 let solde = JSON.parse(window.localStorage.getItem('@solde!#!'));

 return (
  <div className='wrp-title-print-tickets-client'>
   <h2>Nouveau solde :</h2>
   <h2>{parseInt(Number(solde) + Number(newSolde))} {JSON.parse(window.localStorage.getItem('@unite!#!'))}</h2>
  </div>
 );
};