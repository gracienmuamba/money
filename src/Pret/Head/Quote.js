import React from 'react';
import './Quote.css';
import Media from 'react-media';


// View Quote Component 
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
 <div className='quote-view-pret'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='quote-view-pret-sm'>
  <View />
 </div>
);
export const View = () => {
 return (
  <div>
   <p>
    Bienvenue à MuunganoMoney souhaite vous faire une demande de prêt. Cliquez ci-dessous
  </p>

  </div>
 );
};