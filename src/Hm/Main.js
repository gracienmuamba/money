import React from 'react';
import ReturnHm from './Hm';
import { gsap, Expo } from 'gsap';

// Homed page 
export default function Hm() {

 React.useEffect(() => {
  window.setTimeout(() => {
   gsap.to('.App-loading-blank', 0, { delay: .1, x: '-1000%', opacity: 0, ease: Expo.easeIn })
  }, 100);

 }, []);

 return (
  <>
   <div className='App-loading-blank'></div>
   <ReturnHm />
  </>
 );
};