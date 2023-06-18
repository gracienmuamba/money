
import './Logo.css';
import ReturnTitle from './Title';
import ReturnLine from './Line';

//  Logo Print Available
export default function ReturnLogo() {
 return (
  <div className='wrp-logo-print-tickets'>
   <img src={'/img/logo-whites.png'} />
   <ReturnTitle />
  </div>
 );
};