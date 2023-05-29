import React from 'react';
import ReturnHeAd from './Head';

// View Head 
export default function HeAd() {

 const refContainer = React.useRef(null);
 React.useEffect(() => { refContainer.current.scrollIntoView({ behavior: "smooth" }); });

 return (
  <div ref={refContainer}>
   <ReturnHeAd />
  </div>
 );

};