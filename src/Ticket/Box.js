import './Box.css';
import ReturnName from './Name';
import ReturnAvataR from './IMA';
import ReturnQuOTe from './Quote';


// Box Ticket view
export default function ReturnBox() {
 return (
  <div className='box-ticket-printer'>

   <ReturnAvataR />
   <ReturnName />
   <ReturnQuOTe />

  </div>
 );
};