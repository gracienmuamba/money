import React from 'react';
import './Head.css';
import ReturnQuoTe from './Quote';
import REturnCurrenT from './Btn';
import ReturnAvataR from './IMA';
import REturnArroW from './Arrow';


// Return Head Component
export default function ReturnHeAd() {

 const refContainer = React.useRef(null);
 React.useEffect(() => { refContainer.current.scrollIntoView({ behavior: "smooth" }); });

 return (
  <div ref={refContainer}>

   <div className='head-wallet'>
    <ReturnAvataR />
    <REturnArroW />
    <ReturnQuoTe />
    <REturnCurrenT />
   </div>
  </div>
 )
}