import React from 'react';
import './Icon.css';
import { VscCheck } from 'react-icons/vsc';
import { TweenMax, Expo } from 'gsap';

// View Icon
export default function ReturnIcOn() {

 React.useEffect(() => {
  TweenMax.from('.icon-pin', 1.2, { delay: 1, y: 20, opacity: 0, ease: Expo.easeInOut });
  TweenMax.from('.icon-pin p', 1.8, { delay: 1.5, y: 20, opacity: 0, ease: Expo.easeInOut });

 }, []);

 return (
  <div className='icon-pin'>
   <VscCheck size={'2em'} />
   <p>
    Le code de connexion a été modifié avec succès
   </p>
  </div>
 );
}