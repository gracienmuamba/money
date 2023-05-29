import React from 'react';
import './Logo.css';
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


export const ScreenLarge = () => {
 return (
  <div className='logo-dashed'>
   <ViewLogo />
  </div>
 );
};
export const ScreenSmall = () => {
 return (
  <div className='logo-dashed-sm'>
   <ViewLogo />
  </div>
 );
}
export const ViewLogo = () => {
 return (
  <img src={'/img/logo-whites.png'} alt={'logo view '} className='Logo' />
 )
};