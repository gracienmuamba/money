
import React from 'react';
import './Logo.css';
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

export const ScreenLarge = () => {
 return (
  <div className='wrp-logo-footer-money'>
   <ViewLoGo />
  </div>
 )
};
export const ScreenSmall = () => {
 return (
  <div className='wrp-logo-footer-money-sm'>
   <ViewLoGo />
  </div>
 );
};
export const ViewLoGo = () => (
 <img src={'/img/logo.png'} alt={'logo view '} />
);