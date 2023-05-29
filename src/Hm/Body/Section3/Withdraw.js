import './Fees.css';
import { CiBank } from 'react-icons/ci';

// Fees Component 
export default function ReturnWithdraw() {
 return (
  <div className='flex-fees'>
   <CiBank size={'2em'} />
   <h3>Retirer des fonds localement</h3>
   <p>
    Déplacez facilement vos fonds entre les devises et retirez-les sur un checkpoint local.
   </p>

  </div>
 );
};