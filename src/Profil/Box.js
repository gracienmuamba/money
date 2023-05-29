import './Box.css';
import ReturnName from './Name';
import ReturnPhoneSetting from './Phone';
import ReturnPinSetting from './Pin';
import ReturnCodeAccessSetting from './Code';
import ReturnAvataR from './Avatar';

// View Box 
export default function ReturnBox() {
 return (
  <div className='wrp-box-profil'>

   <ReturnAvataR />
   <ReturnName />
   <ReturnPhoneSetting />
   <ReturnPinSetting />
   <ReturnCodeAccessSetting />

  </div>
 )
}