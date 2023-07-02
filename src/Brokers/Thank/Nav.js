import React from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


export function BacK() {

 const navigation = useNavigate();
 return (
  <div className='wrp-back-brokers'>
   <div onClick={() => navigation(-1)} className='wrp-back-box-brokers'>
    <HiArrowLeft size={'1.3em'} color={'grey'} />
   </div>
  </div>
 );
}

// NavBar component view 
export default function ReturnNavBaR() {
 return (
  <div className='navbar-top-broker'>
   <nav>

    <Tooltip title="Retour">
     <IconButton>
      <BacK />
     </IconButton>
    </Tooltip>

    <div></div>
   </nav>

  </div>
 );
};

