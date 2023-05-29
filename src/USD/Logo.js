import React from 'react';
import Media from 'react-media';
import ReturnIMA from './IMA';

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
 <div className='wrp-logo-solde'>
  <ViewLogo />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-logo-solde'>
  <ViewLogo />
 </div>
);
export const ViewLogo = () => {
 return (
  <>
   <ReturnIMA IMA={'/img/dollars.png'} />
   <p>Votre solde en dollar americain</p>
  </>
 );
};