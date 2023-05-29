import React from 'react';
import './Devise.css';
import ReturnPreT from './Pret';
import ReturnBox from './Box';
import PretNav from './Nav/Main';

// View Return Devise
export default function ReturnDevise() {

 const refContainer = React.useRef(null);
 React.useEffect(() => { refContainer.current.scrollIntoView({ behavior: "smooth" }); });

 return (
  <div ref={refContainer}>
   <PretNav />

   <div className='wrp-devise-pret'>
    <ReturnPreT />
    <ReturnBox />

   </div>
  </div>
 );
};