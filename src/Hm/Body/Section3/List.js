import React from 'react';
import './List.css';
import ReturnFees from './Fees';
import { TweenMax, Expo } from 'gsap';
import Media from 'react-media';
import ReturnPAid from './Paid';
import ReturnSimplify from './Simplify';
import ReturnWithdraw from './Withdraw';
import ReturnSupport from './Support';


// Purchase List Component 
export default function ReturnList() {
 return (
  <Media
   queries={{
    small: '(max-width: 599px)',
    medium: '(min-width: 600px) and (max-width:1199px)',
    large: '(min-width: 1200px)',
   }}>
   {matches => (
    <>
     {matches.small && <ScreenSmall />}
     {matches.medium && <ScreenMedium />}
     {matches.large && <ScreenLarge />}
    </>
   )}
  </Media>
 );
};

export const ScreenLarge = () => (
 <div className='wrp-list-section-3'>
  <View />
 </div>
);
export const ScreenMedium = () => (
 <div className='wrp-list-section-3'>
  <View />

 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-list-section-3-sm'>
  <View />

 </div>
);
export const View = () => {

 React.useEffect(async () => {

  TweenMax.staggerFrom('.Anima ul li', 1.5, { delay: 1.5, opacity: 0, y: 20, ease: Expo.easeInOut }, 0.08)

 }, []);

 return (
  <nav className='Anima'>
   <ul>
    <li>
     <ReturnFees />
    </li>

    <li>
     <ReturnPAid />
    </li>

    <li>
     <ReturnSimplify />
    </li>


    <li>
     <ReturnSupport />
    </li>


    <li>
     <ReturnWithdraw />
    </li>

   </ul>
  </nav>
 );
};