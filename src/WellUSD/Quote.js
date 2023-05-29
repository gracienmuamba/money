
import React from 'react';
import Media from 'react-media';

// View Quote Component 
export default function ReturnQuote() {
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
 <div className='wrp-quote-withdraw-success'>
  <ViewText />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-quote-withdraw-success-sm'>
  <ViewText />
 </div>
);
export const ViewText = () => {

 return (
   <p>Envoyer des E-money au-delà des frontières est aussi simple que de les envoyer de l'autre côté de la rue.</p>
 );
};


