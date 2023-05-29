
import React from 'react';
import { TweenMax, Power0 } from 'gsap';
import Media from 'react-media';

// Return logo view 
export default function REturnLogo() {
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
 <div className='wrp-with-sucess'>
  <ViewLogo />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-with-sucess-sm'>
  <ViewLogo />
 </div>
);
export const ViewLogo = () => {
 return (
  <img src={'/img/logo.png'} alt={'logo view '} />
 );
};