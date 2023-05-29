import { useNavigate } from 'react-router';
import { GrFormPrevious } from 'react-icons/gr';

export function BacK() {
 const navigation = useNavigate();
 return (
  <div className='wrp-back-brokers'>
   <div onClick={() => navigation('/dash')} className='wrp-back-box-brokers'>
    <GrFormPrevious size={'2em'} color={'black'} />
    <span style={{ color: 'black' }}>Portefeuille</span>
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