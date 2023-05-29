
import React from 'react';
import './Logo.css';
import { TweenMax, Expo } from 'gsap';
import Media from 'react-media';

// Return logo view 
export default function REturnlogo() {
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
     {matches.medium && <ScreenLarge />}
     {matches.large && <ScreenLarge />}
    </>
   )}
  </Media>
 );
};


export const ScreenLarge = () => (
 <div className='wrp-logo-send'>
  <ViewLogo />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-logo-send-sm'>
  <ViewLogo />
 </div>
);
export const ViewLogo = () => {

 React.useEffect(() => {
  TweenMax.to('.Logo', .8, { delay: .5, opacity: 1, y: -40, ease: Expo.easeIn });
 }, []);

 return (
  <img src={'/img/logo.png'} alt={'logo view '} className='Logo' />
 );
};