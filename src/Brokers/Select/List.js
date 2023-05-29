import React from 'react';
import { TweenMax, Expo } from 'gsap';
import ControlledSwitchesAirtel from './Airtel';
import ControlledSwitchesVoda from './Vodacom';
import ControlledSwitchesAfricell from './Africell';
import ControlledSwitchesOrange from './Orange';

import './List.css';

// Purchase List Component 
export default function ReturnListUniTe() {
 React.useEffect(() => {
  TweenMax.staggerFrom('.list-unite-select nav li', 1, { delay: .5, opacity: 0, x: 20, ease: Expo.easeInOut }, 0.4);
 }, []);

 return (
  <div className='list-unite-select'>

   <nav>
    <ul>

     <li><ControlledSwitchesVoda /></li>
     <li><ControlledSwitchesAirtel /></li>
     <li><ControlledSwitchesOrange /></li>
     <li><ControlledSwitchesAfricell /></li>

    </ul>

   </nav>
  </div>
 );
}