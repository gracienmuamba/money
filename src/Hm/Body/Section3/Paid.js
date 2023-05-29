import './Fees.css';
import { CiCreditCardOff } from 'react-icons/ci';

// Fees Component 
export default function ReturnPAid() {
 return (
  <div className='flex-fees'>

   <CiCreditCardOff size={'2em'} />
   <h3>Soyez payé dans des devises populaires</h3>
   <p>Utilisez des comptes récepteurs dans un nombre croissant de devises et soyez payé comme un local</p>
  </div>
 );
};