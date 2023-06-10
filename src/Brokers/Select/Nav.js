import React from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export function BacK() {

 const navigation = useNavigate();
 return (
  <div className='wrp-back-brokers'>
   <div onClick={() => navigation(-1)} className='wrp-back-box-brokers'>
    <HiArrowLeft size={'1.6em'} color={'grey'} />
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

