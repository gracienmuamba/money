import React from 'react';
import { TweenMax, Expo } from 'gsap';
import Media from 'react-media';


// View Quote 
export default function ReturnQuOTe() {

 React.useEffect(() => {
  TweenMax.from('.asked-quote p', 1, { delay: .5, opacity: 0, y: 20, ease: Expo.easeInOut })

 }, []);

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
 <div className='asked-quote-sm'><View /></div>
);
export const ScreenSmall = () => (
 <div className='asked-quote'><View /></div>
);

export const View = () => {
 return (
  <p>Indiquez le montant de la Tontine pour chaque participant</p>
 );
}