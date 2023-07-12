import React from 'react';
import './Dashed.css';
import HeAd from './Head/Main';
import ReturnSpinnerPret from './SpinnerAdd';
import ReturnSpinnerAgentPret from './Spinner';

// ReturnDashEd Component View
export default function ReturnDashEd() {

 const refContainer = React.useRef(null);
 React.useEffect(() => { refContainer.current.scrollIntoView({ behavior: "smooth" }); });

 return (
  <>
   <ReturnSpinnerPret />
   <ReturnSpinnerAgentPret />

   <div ref={refContainer} className='wrp-dashed'>
    <HeAd />
   </div>
  </>
 );
};