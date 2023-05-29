import React from 'react';
import { FcKey } from 'react-icons/fc';
import { TweenMax, Expo } from 'gsap';

// View Image Key
export default function ReturnKey() {

 React.useEffect(() => {
  TweenMax.from('.Anima', 1.8, { delay: .2, opacity: 0, y: -30, ease: Expo.easeInOut })

 }, []);


 return (
  <div className='wrp-ima-key-now Anima'>
   <FcKey size={'2.5em'} />
  </div>
 );
}