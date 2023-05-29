import './Back.css';
import { useNavigate } from 'react-router';
import { GrFormPrevious } from 'react-icons/gr';

export function BacK() {

 const navigation = useNavigate();

 const handlepath = (event) => {
  event.preventDefault();
  navigation(-1);
 }

 return (
  <div className='wrp-back-brokers'>
   <div onClick={handlepath} className='wrp-back-box-brokers'>
    <GrFormPrevious size={'2em'} color={'black'} />
    <span style={{ color: 'black' }}>Devise</span>
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