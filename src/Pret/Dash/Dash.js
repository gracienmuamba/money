import React from 'react';
import './Dash.css';
import HeAd from './Head/Main';

// Dashed main component
export default function ReturnDash() {

 const refContainer = React.useRef(null);
 React.useEffect(() => { refContainer.current.scrollIntoView({ behavior: "smooth" }); });
 return (
  <div ref={refContainer} className='dash-pret'>
   <HeAd />
  </div>
 );
};
