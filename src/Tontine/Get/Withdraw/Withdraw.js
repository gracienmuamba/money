import './Withdraw.css';
import NavBar from './Nav/Main';
import ReturnTitle from './Title';
import ReturnPrix from './Prix';

import ReturnAskedWallet from './Btn';

// Withdraw Component !!
export default function ReturnWithdRAw() {
 return (
  <>
   <NavBar />
   <div className='wrp-withdraw-tontine'>
    <ReturnTitle />
    <ReturnPrix />
    <ReturnAskedWallet />
   </div>
  </>
 );
};