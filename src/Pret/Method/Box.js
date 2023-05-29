
import './Box.css';
import ReturnAll from './All';
import ReturnPart from './Part';


// Box view component
export default function ReturnBox() {
 return (
  <div className='wrp-box-pret-method'>
   <ReturnAll />
   <ReturnPart />
  </div>
 );

}