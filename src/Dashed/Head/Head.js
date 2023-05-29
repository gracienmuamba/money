import './Head.css';
import ReturnBoX from './Box';
import ReturnNav from './Nav';

// View Head Component  
export default function ReturnHeAd() {
 return (
  <div className='head-dashed'>
   <ReturnNav />
   <ReturnBoX />
  </div>
 );
};