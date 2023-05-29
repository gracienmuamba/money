import React from 'react';
import ReturnHeAd from './Head/Main';

// List Component 
export default function ReturnLisT() {

 const refContainer = React.useRef(null);
 React.useEffect(() => { refContainer.current.scrollIntoView({ behavior: "smooth" }); });

 return (
  <div ref={refContainer}>
   <ReturnHeAd />
  </div>
 );
};