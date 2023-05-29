
import React from 'react';
import './Logo.css';
import { TweenMax, Expo } from 'gsap';

// Return logo view 
export default function REturnlogo() {

 React.useEffect(() => {
  TweenMax.from('.wrp-logo-valid img', 1.2, { delay: .5, opacity: 0, y: 25, ease: Expo.easeIn });
 }, []);

 return (
  <div className='wrp-logo-valid'>
   <img src={'/img/logo.jpg'} alt={'logo view '} />
  </div>
 );
};