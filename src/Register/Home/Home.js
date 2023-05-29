import './Home.css';
import REturnLogo from './Logo';
import REturnBtn from './Btn';
import REturnArroW from './Arrow';

// REturnBtn Home Component 
export default function RegisterHome() {
 return (
  <div className='wrp-box-register'>
   <REturnArroW />
   <REturnLogo />
   <REturnBtn />
  </div>
 );
};