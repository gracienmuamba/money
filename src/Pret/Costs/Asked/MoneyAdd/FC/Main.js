import React from 'react';
import REturnIMA from './IMA';
import ReturnQuOTe from './Quote';
import REturnInput from './Input';


// Export Send Money
export default function SendfRanAdd() {

 return (
  <>
   <REturnIMA IMA={'/img/dollars.png'} />
   <ReturnQuOTe />
   <REturnInput />
  </>
 );
}