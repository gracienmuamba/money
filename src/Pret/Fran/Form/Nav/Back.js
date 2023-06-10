import './Back.css';
import { useNavigate } from 'react-router';
import { HiArrowLeft } from 'react-icons/hi';

export function BacK() {

 const navigation = useNavigate();

 const handlepath = (event) => {
  event.preventDefault();
  navigation(-1);
 }

 return (
  <div className='wrp-back-brokers'>
   <div onClick={handlepath} className='wrp-back-box-brokers'>
    <HiArrowLeft size={'1.6em'} color={'grey'} />
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