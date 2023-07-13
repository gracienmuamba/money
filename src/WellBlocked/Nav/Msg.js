import React from 'react';
import './Msg.css';

import ReturnLogo from './Logo';
import ReturnNameClienT from './Client';
import ReturnPhoneClienT from './Phone';
import ReturnType from './Type';
import ReturnDepot from './Depot';
import ReturnNameAgent from './Agent';
import ReturnNewSolde from './NewSolde';
import ReturnQuote from './Quote';
// import ReturnThanKs from './Thank';
import ReturnLine from './Line';
import ReturnDateClienT from './Date';

import ReturnContry from './Contry';

// Msg React from Component !!!
export default function ReturnMsg() {
 return (
  <div className='wrp-msg-output-ticked'>

   <ReturnLine />

   <ReturnLogo />
   <ReturnContry />

   <ReturnNameClienT />
   <ReturnPhoneClienT />

   <ReturnType />
   <ReturnDepot />

   <ReturnNewSolde />
   <ReturnNameAgent />
   <ReturnDateClienT />

   <ReturnQuote />
   {/* <ReturnThanKs /> */}

  </div>

 );
};

