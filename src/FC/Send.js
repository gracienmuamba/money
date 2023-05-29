import React from 'react';
import './Send.css';
import REturnBoxSend from './Box';
import REturnArroW from './Arrow';
import REturnlogo from './Logo';

// Send View Money
export default function REturnSendMoney() {

 const refContainer = React.useRef(null);
 React.useEffect(() => { refContainer.current.scrollIntoView({ behavior: "smooth" }); });


 return (
  <div ref={refContainer}>
   <REturnArroW />

   <div className='wrp-money-send'>
    <REturnlogo />
    <REturnBoxSend />
   </div>
  </div>
 );
};