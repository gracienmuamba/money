import React from 'react';
import Media from 'react-media';
import './Prix.css';
// import { prixHash } from '../Pin/Fc/Simple/Input';
import ReturnIMAFlags from './Flags';


// Name withdraw sign
export default function ReturnSolde() {
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
 )
};

export const ScreenLarge = () => (
 <div className='wrp-success-withd-prix'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-success-withd-prix-sm'>
  <View />
 </div>
);
export const View = () => {

 return (
  <>
   <ReturnIMAFlags IMA={'/img/franc.png'} />
   <h2>{(JSON.parse(window.localStorage.getItem('@solde!#!'))).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ')}</h2>
  </>
 );
};