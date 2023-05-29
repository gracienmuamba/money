import React from 'react';
import './Quote.css';
import Media from 'react-media';

// REturn Quote 
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

export const ScreenLarge = () => {
 return (
  <div className='wrp-quote-validexchange'>
   <ViewText />
  </div>
 )
};
export const ScreenSmall = () => {
 return (
  <div className='wrp-quote-validexchange-sm'>
   <ViewText />
  </div>
 )
};
export const ViewText = () => (
 <p>
  Indiquez le numéro du bénéficiaire
 </p>
);