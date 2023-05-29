import './Body.css';
import PrIx from './Prix/Main';
import SeRvice from './Service/Main';
import SwAp from './Swap/Main';
import FaQ from './FAQ/Main';
import LogOuT from './Logout/Main';

// ReturnBodydAshed from
export default function ReturnbodydAshed() {
 return (
  <div className='body-dashed'>
   <PrIx />
   <SeRvice />
   <SwAp />
   <FaQ />
   <LogOuT />
  </div>
 );
};