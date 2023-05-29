import React from 'react';
import Media from 'react-media';
import ReturnNavBaR from './Nav';


// REturn Arrow component 
export default function REturnArroW() {
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
 <div className='wrp-arrow-profil'>
  <ReturnNavBaR />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-arrow-profil-sm'>
  <ReturnNavBaR />

 </div>
);
export const Arrow = () => {
 return (
  <div className='wrp-icon'>
   <ReturnNavBaR />
  </div>
 );
}