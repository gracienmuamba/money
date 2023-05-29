
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
  <div className='wrp-subject-withdraw'>
   <ViewText />
  </div>
 )
}
export const ScreenSmall = () => {
 return (
  <div className='wrp-subject-withdraw-sm'>
   <ViewText />
  </div>
 );
};
export const ViewText = () => (
 <p>
  Utilisez votre devise Dollars Americain ou le Franc Congolais.
 </p>
)