import React from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';



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
 <div className='pin-arrow-broker'>
  <Arrow />
 </div>
);
export const ScreenSmall = () => (
 <div className='pin-arrow-broker-sm'>
  <Arrow />

 </div>
);
export const Arrow = () => {
 const navigation = useNavigate();
 const handlepath = (event) => {
  event.preventDefault();
  navigation(-1);
 };

 return (
  <div onClick={handlepath}>
   <HiArrowLeft size={'1.8em'} />
  </div>
 );
}