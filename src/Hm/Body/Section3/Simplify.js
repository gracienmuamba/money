import './Fees.css';
import { CiBadgeDollar } from 'react-icons/ci';

// Fees Component 
export default function ReturnSimplify() {
 return (
  <div className='flex-fees'>
   <CiBadgeDollar size={'2em'} />
   <h3>Simplifiez vos paiements</h3>
   <p>
    Payez des sous-traitants et des fournisseurs partout,directement à partir de votre solde MuunganoMoney.
   </p>

  </div>
 );
};