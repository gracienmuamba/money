import './IMA.css';
import NavHm from './Nav/Main';
import ReturnQuOte from './Quote';

// IMA component
export default function ReturnIMA() {
 return (
  <div className='hm-ima-bg'>
   <NavHm />
   <div className='hm-color-bg'></div>
   <img src='/img/scaled.jpg' alt='hm images' />
   <ReturnQuOte />
  </div>
 );
};