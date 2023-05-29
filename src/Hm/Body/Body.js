import './Body.css';
import SectIOn1 from './Section1/Main';
import SectIOn2 from './Section2/Main';
import SectIOn3 from './Section3/Main';
import SectIOn4 from './Section4/Main';

// Return Body compoennt 
export default function ReturnBody() {
 return (
  <div className='body-hm'>
   <SectIOn1 />
   <SectIOn2 />
   <SectIOn3 />
   <SectIOn4 />
  </div>
 );
};