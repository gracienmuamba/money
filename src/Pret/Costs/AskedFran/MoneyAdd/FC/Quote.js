import React from 'react';
import { TweenMax, Expo } from 'gsap';

// View Quote 
export default function ReturnQuOTe() {

 React.useEffect(() => {
  TweenMax.from('.asked-quote p', 1, { delay: .5, opacity: 0, y: 20, ease: Expo.easeInOut })

 }, []);

 return (
  <div className='asked-quote'>
   <p>Indiquez le montant du prêt a remboursé</p>
  </div>
 );
};