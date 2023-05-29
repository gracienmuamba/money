import './Box.css';
import ReturnFiAt from './Fiat';
import ReturnTitle from './Title';

// Box Component
export default function ReturnBox() {
 return (
  <div className='box-nav-stock'>
   <ReturnTitle />
   <div></div>
   {/* <ReturnFiAt /> */}
  </div>
 )
}