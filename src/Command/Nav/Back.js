import React from 'react';
import { useNavigate } from 'react-router';
import { HiArrowLeft } from 'react-icons/hi';
import './Back.css';

// Back 
export default function ReturnBacK() {

 const navigation = useNavigate();
 const handlepath = (event) => {
  event.preventDefault();
  navigation('/dash');
 };

 return (
  <div onClick={handlepath} className='wrp-back-cmd-fiat'>
   <HiArrowLeft size={'1.6em'} color={'grey'} />
  </div>
 );
};