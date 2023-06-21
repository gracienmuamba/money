import React from 'react';

import ReturnLogo from './Logo';
import ReturnNameClienT from './Client';
import ReturnPhoneClienT from './Phone';
import ReturnType from './Type';
import ReturnDepot from './Depot';
import ReturnNameAgent from './Agent';
import ReturnNewSolde from './NewSolde';
import ReturnQuote from './Quote';
import ReturnThanKs from './Thank';
import ReturnLine from './Line';
import ReturnDateClienT from './Date';
import ReturnQRcode from './Qrcode';

import ReturnContry from './Contry';


// Msg React from Component !!!
export default function ReturnMsg() {
 return (
  <div className='wrp-msg-output-ticked' id='element-to-download-as-pdf'>
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
   <ReturnThanKs />
   <ReturnQRcode />

   <ReturnLine />

  </div>

 );
};

