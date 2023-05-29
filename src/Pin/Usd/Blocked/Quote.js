import React from 'react';
import './Quote.css';
import Media from 'react-media';
import { TweenMax, Expo } from 'gsap';

// Quote view Compoennt 
export default function REturnQuOte() {
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
 <div className='wrp-qtform-send-money'>
  <ViewQuote />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-qtform-send-money-sm'>
  <ViewQuote />
 </div>
);
const ViewQuote = () => {

 React.useEffect(() => {
  TweenMax.from('.Anime', 1, { delay: 1, y: 0, opacity: 0, ease: Expo.easeIn });
 }, []);

 return (
  <p className='Anime'>
   Spécifiez  votre code (pin) pour la validiter d'envoi.
  </p>
 );
};