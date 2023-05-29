import './Region.css';
import REturnLogo from './Logo';
import REturnContry from './Contry';
import REturnQuOte from './Quote';
import BtnRegion from './Btn';
import ReturnNavBaR from './Nav';


// ReturnRegion compoennt
export default function ReturnRegion() {
 return (
  <>
   <ReturnNavBaR />
   <div className='wrp-region'>
    <REturnLogo />
    <REturnContry />
    <REturnQuOte />
    <BtnRegion />
   </div>
  </>
 );
};