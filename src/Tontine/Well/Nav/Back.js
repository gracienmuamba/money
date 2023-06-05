import React from 'react';
import { useNavigate } from 'react-router';
import { HiArrowLeft } from 'react-icons/hi';

// Back 
export default function ReturnBacK() {

 const navigation = useNavigate();
 const handlepath = (event) => {
  event.preventDefault();
  navigation('/tontine');
 };

 return (
  <div onClick={handlepath} className='tontine-back'>
   <HiArrowLeft size={'1.8em'} color={'grey'} />
  </div>
 );
};