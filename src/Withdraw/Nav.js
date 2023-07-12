import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export function BacK() {

 const navigation = useNavigate();
 return (
  <div className='wrp-back-brokers'>
   <div onClick={() => navigation(-1)} className='wrp-back-box-brokers'>

    <Tooltip title="Retour">
     <IconButton>
      <HiArrowLeft size={'1.3em'} color={'grey'} />
     </IconButton>
    </Tooltip>

   </div>
  </div>
 );
}
// NavBar component view 
export default function ReturnNavBaR() {
 return (
  <div className='navbar-top-broker'>
   <nav>
    <BacK />
    <div></div>
   </nav>
  </div>
 );
};

