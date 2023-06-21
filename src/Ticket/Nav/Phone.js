import React from 'react';

// Title Return Compoennt
export default function ReturnPhoneClienT() {

 let phone = JSON.parse(window.localStorage.getItem('A@@ph$$&-@#'));

 return (
  <div className='wrp-title-print-tickets-client'>
   <h2>ID : </h2>
   <h2>****************{phone.slice(-3)}</h2>
  </div>
 );
};