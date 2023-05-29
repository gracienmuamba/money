
import React from 'react';
import './Contry.css';
import { TweenMax, Power3 } from 'gsap';

// Contry Component 
export default function REturnContry() {

 React.useEffect(() => {
  TweenMax.from('.wrp-contry-region h4', .5, { delay: 1, opacity: 0, y: 3, ease: Power3.easeIn });
 }, []);

 return (
  <div className='wrp-contry-region'>
   <h4>Contry Region / RD.Congo</h4>
  </div>
 );
};