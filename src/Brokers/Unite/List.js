import React from 'react';
import { TweenMax, Expo } from 'gsap';
import ReturnIMA from './IMA';
import './List.css';

// Purchase List Component 
export default function ReturnListUniTe() {

 React.useEffect(() => {
  TweenMax.staggerFrom('.list-unite nav li', 2, { delay: 1.5, opacity: 0, x: 20, ease: Expo.easeInOut }, 0.08)
 }, []);

 return (
  <div className='list-unite'>
   <nav>
    <ul>
     <li><ReturnIMA IMA={'/img/vodafone.png'} /></li>
     <li><ReturnIMA IMA={'/img/africell.jpg'} /></li>
     <li><ReturnIMA IMA={'/img/Orange.png'} /></li>
     <li><ReturnIMA IMA={'/img/airtel.jpg'} /></li>

    </ul>

   </nav>
  </div>
 );
}