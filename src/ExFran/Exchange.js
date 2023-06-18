// import REturnArroW from './Arrow';
import ReturnPriX from './Prix';
import ReturnName from './Name';
import ReturnDate from './Date';
import ReturnBtnValid from './Valid';
import ReturnAvataR from './IMA';
import './Exchange.css';

import NavBar from './Nav/Main';

// Transaction view available
export default function ReturnTrAnsAction() {
 return (
  <div className='wrp-exchange'>
   <NavBar />
   <ReturnAvataR />
   <ReturnName />
   <ReturnPriX />
   <ReturnDate />
   <ReturnBtnValid />
  </div>
 );
}