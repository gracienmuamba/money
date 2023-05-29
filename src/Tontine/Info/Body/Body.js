import ReturnTitle from './Title';
import ReturnQuoTe from './Quote';
import ReturnBtn from './Btn';
import './Body.css';

// Return Body view
export default function ReturnBody() {
 return (
  <div className='wrp-body-info-tontine'>
   <ReturnTitle />
   <ReturnQuoTe />
   <ReturnBtn />

  </div>
 );
}