import ReturnPriX from './Prix';
import ReturnName from './Name';
import ReturnDate from './Date';
import ReturnBtnValid from './Valid';
import ReturnAvataR from './IMA';


// Transaction view available
export default function ReturnTrAnsAction() {
 return (
  <div className='wrp-exchange'>
   <ReturnAvataR />
   <ReturnName />
   <ReturnPriX />
   <ReturnDate />
   <ReturnBtnValid />
  </div>
 );
}