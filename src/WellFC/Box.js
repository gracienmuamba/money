import './Box.css';
import ReturnnAme from './Name';
import ReturnSolde from './Prix';
import RetuRnDate from './Date';
import ReturnSucsess from './Success';
import ReturnAvataR from './IMA';

// Box Component 
export default function ReturnBoxWell() {
 return (
  <div className='wrp-box-well'>
   <ReturnnAme />
   <ReturnAvataR />
   <ReturnSolde />
   <RetuRnDate />
   <ReturnSucsess />
  </div>
 );
};