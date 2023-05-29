import './Buy.css';
import ReturnNavBaR from './Nav';
import ReturnQuoTe from './Quote';

// Broker Component
export default function ReturnBuyBroker() {
 return (
  <div className='wrp-buy-brokers-thank'>
   <ReturnNavBaR />
   <div className='wrp-buy-brokers-thank-sub'>

    <ReturnQuoTe />
   </div>
  </div>
 );
};