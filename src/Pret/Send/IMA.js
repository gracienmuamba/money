import './IMA.css';
import folder from '../../images/folder.gif';
import React from 'react';
import { TweenMax, Expo } from 'gsap';

// View IMA 
export default function ReturnIMA() {

 React.useEffect(() => {
  TweenMax.from('.Anima-Send', 1, { delay: 5, opacity: 0, ease: Expo.easeInOut });

 }, [])

 return (
  <div className='ima-send-pret'>
   <img src={folder} alt='send pret' className='package Anima-Send' />
  </div>
 )
};