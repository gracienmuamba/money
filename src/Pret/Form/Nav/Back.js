import './Back.css';
import { useNavigate } from 'react-router';
import { HiArrowLeft } from 'react-icons/hi';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


export function BacK() {

 const navigation = useNavigate();
 const handlepath = (event) => {
  event.preventDefault();
  navigation(-1);
 };

 return (
  <div className='wrp-back-brokers'>
   <div onClick={handlepath} className='wrp-back-box-brokers'>

    <Tooltip title="Retour">
     <IconButton>
      <HiArrowLeft size={'1.3em'} color={'grey'} />
     </IconButton>
    </Tooltip>

   </div>
  </div>
 );
};

// Return Back
export default function ReturnBacK() {
 return (
  <BacK />
 );
};