import React from 'react';
import './Cmd.css';
import NavStocK from './Nav/Main';

// View Cmd Command
export default function ReturnCommAnd() {

 const refContainer = React.useRef(null);
 React.useEffect(() => { refContainer.current.scrollIntoView({ behavior: "smooth" }); });

 return (
  <div ref={refContainer}>
   <NavStocK />
  </div>
 )
}