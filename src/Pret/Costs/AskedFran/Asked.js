import SendfDollarsAdd from './MoneyAdd/FC/Main';
import PretNav from './Nav/Main';

// View ReturnAsKed 
export default function ReturnAsKed() {
 return (
  <>
   <PretNav />
   <div className='asked-send-costs-view'>
    <SendfDollarsAdd />
   </div>
  </>
 );
};