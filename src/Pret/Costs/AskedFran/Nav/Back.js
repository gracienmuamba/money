import React from 'react';
import { useNavigate } from 'react-router';
import { GrFormPrevious } from 'react-icons/gr';

// Back 
export default function ReturnBacK() {

 const navigation = useNavigate();
 const handlepath = (event) => {
  event.preventDefault();
  navigation(-1);
 };

 return (
  <div onClick={handlepath} className='tontine-back'>
   <GrFormPrevious size={'2em'} color={'black'} />
   <span style={{ color: 'black' }}>Devise</span>
  </div>
 );
};