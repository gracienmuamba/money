import React from 'react';
import { VscChevronLeft } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';

// Back Component Home
export default function ReturnBAck() {

 const navigation = useNavigate();
 return (
  <div className='wrp-back-brokers'>

   <div onClick={() => navigation('/dash')} className='wrp-back-box-brokers'>
    <VscChevronLeft size={'1.5em'} />
    <span>Dash</span>
   </div>

  </div>
 );
}