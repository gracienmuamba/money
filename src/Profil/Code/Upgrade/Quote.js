import React from 'react';
import Media from 'react-media';
import { TweenMax, Expo } from 'gsap';

// Return Quote Component
export default function ReturnQuOte() {
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
 <div className='wrp-quote-now'>
  <ViewQuote />
 </div>
)
export const ScreenSmall = () => (
 <div className='wrp-quote-now-sm'>
  <ViewQuote />
 </div>
)
export const ViewQuote = () => {

 React.useEffect(() => {
  TweenMax.from('.Anima-Pin', 1.5, { delay: 1, y: 30, opacity: 0, ease: Expo.easeIn });
 }, []);

 return (
  <p style={{ color: '#e63946' }} className='Anima-Pin'>
   Choisissez un nouveau code à utiliser
  </p>
 )
}