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

export const ScreenLarge = () => (
 <div className='logo-withdraw'>
  <ViewText />
 </div>
);
export const ScreenSmall = () => (
 <div className='logo-withdraw-sm'>
  <ViewText />
 </div>
);
export const ViewText = () => {
 return (
  <img src={'/img/logo.png'} alt={'logo view '} />
 );
};
