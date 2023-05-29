import React from 'react';
import './Quote.css';
import ReturnQuOteText from './Text';
import Media from 'react-media';


// Quote Component 
export default function ReturnQuOte() {
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
     {matches.medium && <ScreenMedium />}
     {matches.large && <ScreenLarge />}
    </>
   )}
  </Media>
 );
};


export const ScreenLarge = () => {

 return (
  <div className='wrp-que-hm'>
   <View />
  </div>
 );
};


export const ScreenMedium = () => (
 <div className='wrp-que-hm'>
  <View />
 </div>
);
export const ScreenSmall = () => {

 return (
  <div className='wrp-que-hm-sm'>
   <h2>Payer en ligne avec</h2>
   <h2>confiance</h2>
  </div>
 );
};
export const View = () => (
 <>
  <h2>Payer en ligne avec</h2>
  <h3>confiance</h3>
  <ReturnQuOteText />
 </>
)

