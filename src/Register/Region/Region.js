import './Region.css';
import REturnLogo from './Logo';
import REturnContry from './Contry';
import REturnQuOte from './Quote';
import BtnRegion from './Btn';


// ReturnRegion compoennt
export default function ReturnRegion() {
 return (
  <>
   <div className='wrp-region'>
    <REturnLogo />
    <REturnContry />
    <REturnQuOte />
    <BtnRegion />
   </div>
  </>
 );
};