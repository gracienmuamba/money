import React from 'react';
import './Back.css';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';

// Back Component Home
export default function ReturnBAck() {

 const navigation = useNavigate();
 return (
  <div className='wrp-back-brokers'>

   <div onClick={() => navigation(-1)} className='wrp-back-box-brokers'>
    <HiArrowLeft size={'1.6em'} color={'grey'} />
   </div>

  </div>
 );
}