import './Box.css';
import ReturnFrAn from './Fran';
import ReturnDollArs from './Dollar';


// Return Box view
export default function ReturnBox() {
 return (
  <div className='box-devise-pret'>
   <ReturnFrAn />
   <ReturnDollArs />
  </div>
 );
}