import React from 'react';
import './Dashed.css';
import HeAd from './Head/Main';

// ReturnDashEd Component View
export default function ReturnDashEd() {

 const refContainer = React.useRef(null);
 React.useEffect(() => { refContainer.current.scrollIntoView({ behavior: "smooth" }); });


 return (
  <div ref={refContainer} className='wrp-dashed'>
   <HeAd />
  </div>
 );
};