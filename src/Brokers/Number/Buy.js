import './Buy.css';
import ReturnNavBaR from './Nav';
import PhoneBroKer from './Phone/Main';

// Broker Component
export default function ReturnBuyBroker() {
 return (
  <>

   <div className='wrp-buy-brokers'>
    <ReturnNavBaR />

    <div className='wrp-buy-brokers-sub'>
     <PhoneBroKer />
    </div>

   </div>
  </>
 );
};