import ReturnnAme from './Name';
import ReturnSolde from './Prix';
import RetuRnDate from './Date';
import ReturnSucsess from './Success';

import ReturnAvataR from './IMA';
import NavBar from './Nav/Main';
import ReturnQuote from './Quote';

// Box Component 
export default function ReturnBoxWell() {
 return (
  <div className='wrp-box-well'>
   <NavBar />
   <ReturnAvataR />
   <ReturnnAme />
   <ReturnSolde />

   <ReturnQuote />

   <RetuRnDate />
   <ReturnSucsess />

  </div>
 );
};