import './Upgrade.css';
import REturnArroW from './Arrow';
import ReturnFormUpdate from './Input';
import ReturnPrivacy from './IMA';
import ReturnQuOte from './Quote';

// Return Upgrade Component 
export default function ReturnUpgrAde() {
 return (
  <div className='wrp-upgrade'>

   <ReturnPrivacy />
   <ReturnQuOte />
   <REturnArroW />
   <ReturnFormUpdate />
  </div>
 );
}