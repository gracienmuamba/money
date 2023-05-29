import './Asked.css';
import SendfDollarsAdd from './MoneyAdd/FC/Main';
import PretNav from './Nav/Main';

// View ReturnAsKed 
export default function ReturnAsKed() {
 return (
  <div className='asked-send-costs-view'>
   <PretNav />
   <SendfDollarsAdd />
  </div>
 );
};