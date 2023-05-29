import React from 'react';
import './Profil.css';
import Media from 'react-media';
import ReturnName from './Name';


// Avatar IMAGE VIew
export default function ReturnProfil() {
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
  <div className='profil-prix-pret-dash'>
   <View />
  </div>
 );
}
export const ScreenSmall = () => (
 <div className='profil-prix-pret-dash'>
  <View />
 </div>
);
export const View = () => {

 return (
  <div>
   <img src={'/img/pret-home.png'} />
   <ReturnName />
  </div>
 );
};