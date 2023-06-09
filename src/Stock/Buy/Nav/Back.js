import React from 'react';
import { useNavigate } from 'react-router';
import { HiArrowLeft } from 'react-icons/hi';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


// Back 
export default function ReturnBacK() {

 const navigation = useNavigate();
 const handlepath = (event) => {
  event.preventDefault();
  navigation(-1);
 };

 return (
  <div onClick={handlepath} className='wrp-back-cmd-fiat'>

   <Tooltip title="Retour">
    <IconButton>
     <HiArrowLeft size={'1.3em'} color={'grey'} />
    </IconButton>
   </Tooltip>

  </div>
 );
};