import React from 'react';
import { useNavigate } from 'react-router';
import { HiArrowLeft } from 'react-icons/hi';
import './Back.css';

// Back 
export default function ReturnBacK() {

 const navigation = useNavigate();
 const handlepath = (event) => {
  event.preventDefault();
  navigation(-1);
 };

 return (
  <div onClick={handlepath} className='tontine-back'>
   <HiArrowLeft size={'1.8em'} color={'grey'} />
  </div>
 );
};