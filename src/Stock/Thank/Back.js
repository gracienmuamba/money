import React from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

// Back Component Home
export default function ReturnBAck() {

 const navigation = useNavigate();
 return (
  <div className='wrp-back-brokers'>

   <div onClick={() => navigation('/dash')} className='wrp-back-box-brokers'>
    <HiArrowLeft size={'1.6em'} color={'grey'} />
   </div>

  </div>
 );
}