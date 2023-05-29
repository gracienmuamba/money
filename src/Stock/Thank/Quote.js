import React from 'react';
import './Quote.css';
import Media from 'react-media';
import { TweenMax, Expo } from 'gsap';

// Return Quote Component
export default function ReturnQuoTe() {
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
 <div className='wrp-qt-buy-stock'>
  <ViewQuoTe />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-qt-buy-stock-sm'>
  <ViewQuoTe />
 </div>
);
export const ViewQuoTe = () => {

 React.useEffect(() => {
  TweenMax.from('.Anima', 1.5, { delay: 1, y: 10, opacity: 0, ease: Expo.easeInOut })

 }, []);

 return (
  <p className='Anima'>
   MuunganoMoney Vous remercie
   de votre Achat en ligne Vous serez
   servi dans un instant. Merci.
  </p>
 );
};