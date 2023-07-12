import React from 'react';
import secureLocalStorage from "react-secure-storage";

// Title Return Compoennt
export default function ReturnPhoneClienT() {

 let phone = secureLocalStorage.getItem("A@@ph$$&-@#");

 return (
  <div className='wrp-title-print-tickets-client'>
   <h2>ID : </h2>
   <h2>****************{phone.slice(-3)}</h2>
  </div>
 );
};