import React from 'react';
import './Tontine.css';
import ReturnIMA from './IMA';
import NavBar from './Nav/Main';
import ReturnWelCome from './Welcome';
import ReturnBtn from './Btn';
import RetuRnCreAte from './Create';

// return view tontine
export default function ReturnTontine() {

 const refContainer = React.useRef(null);
 React.useEffect(() => { refContainer.current.scrollIntoView({ behavior: "smooth" }); });

 return (
  <div ref={refContainer} className='wrp-tontine'>
   <NavBar />
   <ReturnIMA />
   <ReturnWelCome />
   <ReturnBtn />
   <RetuRnCreAte />
  </div>
 );
};