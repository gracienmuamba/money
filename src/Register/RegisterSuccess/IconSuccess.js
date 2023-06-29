import React from 'react';
import './IconSuccess.css';
import { VscCheck } from 'react-icons/vsc';
import { TweenMax, Expo } from 'gsap';

// Return Icon Success 
export default function ReturnIconSuccess() {

 React.useEffect(() => {
  TweenMax.from('.wrp-icon-success span', 1, { delay: .5, y: 5, opacity: 0, ease: Expo.easeInOut });
  TweenMax.from('.wrp-icon-success p', 1, { delay: 1, y: 8, opacity: 0, ease: Expo.easeInOut });
 }, []);

 return (
  <div className='wrp-icon-success'>
   <span><VscCheck size={'2em'} /></span>
   <p>Enregistre avec success</p>
  </div>
 );
};
