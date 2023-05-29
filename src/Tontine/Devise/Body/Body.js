import ReturnTitle from './Title';
// import FormInput from './Input';
import './Body.css';
import ReturnBox from './Box';

// Return Body view
export default function ReturnBody() {
 return (
  <div className='wrp-body-form-tontine'>
   <ReturnTitle />
   <ReturnBox />
  </div>
 );
}