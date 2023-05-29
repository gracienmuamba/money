import React from 'react';
import { TweenMax, Expo } from 'gsap';
import './Icon.css';

// well icon
export default function ReturnIcOn() {

 React.useEffect(() => {
  TweenMax.from('.well-icon-tontine img', 1.2, { delay: 1.2, opacity: 0, ease: Expo.easeIn });

 }, []);

 return (
  <div className='well-icon-tontine'>
   <img src={'/img/check.png'} />
  </div>
 );
};