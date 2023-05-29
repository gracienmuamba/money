import React from 'react';
import { useNavigate } from 'react-router';
import { GrFormPrevious } from 'react-icons/gr';
import './Back.css';

// Back 
export default function ReturnBacK() {

 const navigation = useNavigate();
 const handlepath = (event) => {
  event.preventDefault();
  navigation('/dash');
 };

 return (
  <div onClick={handlepath} className='tontine-back'>
   <GrFormPrevious size={'2em'} color={'black'} />
   <span style={{ color: 'black' }}>Portefeuille</span>
  </div>
 );
};