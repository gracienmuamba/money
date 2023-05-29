import './Fees.css';
import { CiDiscount1 } from 'react-icons/ci';

// Fees Component 
export default function ReturnFees() {
 return (
  <div className='flex-fees'>

   <CiDiscount1 size={'2em'} />
   <h3>Frais réduits</h3>
   <p>Payez jusqu'à 80 % de moins par rapport aux virements bancaires standard. Pas de frais cachés.</p>
  </div>
 );
};

