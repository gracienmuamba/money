import React from 'react';
import { TweenMax, Expo } from 'gsap';
import './Quote.css';

// Quote view 
export default function ReturnQuoTe() {

 React.useEffect(() => {
  TweenMax.from('.qt-well-body-tontine p', 1, { delay: 1.2, opacity: 0, y: 10, ease: Expo.easeIn });

 }, []);

 return (
  <div className='qt-well-body-tontine'>
   <p>Le groupe est créé avec succès</p>
  </div>
 );
};