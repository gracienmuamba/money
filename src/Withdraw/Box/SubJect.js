import React from 'react';
import './SubJect.css';
import Media from 'react-media';


// Width draw SubJect component
export default function REturnSuBJect() {
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
  <div className='wrp-subject-draw'>
   <ViewText />
  </div>
 )
}
export const ScreenSmall = () => {

 return (
  <div className='wrp-subject-draw'>
   <ViewText />
  </div>
 );
};
export const ViewText = () => (
 <p>
  Echangez des e-monnaies : Dollars Americain et Fran RD.Congo.
 </p>
)