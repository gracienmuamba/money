
import './Slide.css';
import WalletNav from '../Nav/Main';
import ReturnCDF from './Prix';
import ReturnSmallMoneyCdf from './Small';
import ReturnQuoTe from './Quote';
import REturnCurrenT from './Btn';


// Return Slide Component 
export default function ReturnSlide() {
 return (
  <>
   <div className='bg-image-wallet'>

    <WalletNav />
    <ReturnCDF />
    <ReturnSmallMoneyCdf />
    <ReturnQuoTe />
    <REturnCurrenT />

   </div>
  </>
 );
};