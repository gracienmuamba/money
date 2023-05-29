import React from 'react';
import { GrFormPrevious } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

export function BacK() {

 const navigation = useNavigate();
 return (
  <div className='wrp-back-brokers'>
   <div onClick={() => navigation(-1)} className='wrp-back-box-brokers'>
    <GrFormPrevious size={'2em'} />
    <span>Operateur</span>
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

