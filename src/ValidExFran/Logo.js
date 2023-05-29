
import React from 'react';
import './Logo.css';
import Media from 'react-media';
import { TweenMax, Power0 } from 'gsap';

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
 <div className='wrp-logo-validexchange'>
  <ViewLogo />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-logo-validexchange-sm'>
  <ViewLogo />
 </div>
);
export const ViewLogo = () => {

 React.useEffect(() => {
  TweenMax.from('.Anime', 1, { delay: .5, opacity: 0, y: 5, ease: Power0.easeIn });
 }, []);

 return (
  <img src={'/img/logo.png'} alt={'logo view '} className='Anime' />
 );
};