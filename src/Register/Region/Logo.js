
import React from 'react';
import './Logo.css';
import Media from 'react-media';
import { TweenMax, Expo } from 'gsap';

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

export const ScreenLarge = () => {
 return (
  <div className='wrp-logo-regio'>
   <ViewLogo />
  </div>
 )
};
export const ScreenSmall = () => {
 return (
  <div className='wrp-logo-regio-sm'>
   <ViewLogo />
  </div>
 )
};

export const ViewLogo = () => {

 React.useEffect(() => {
  TweenMax.from('.img-logo-anime', .5, { delay: .5, opacity: 0, y: 3, ease: Expo.easeIn });
 }, []);

 return (
  <div className='img-logo-anime'>
   <img src={'/img/logo.png'} alt={'logo view '} />
  </div>
 );
};