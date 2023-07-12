import React from 'react';
import Media from 'react-media';
import ReturnIMAFlags from './Flags';
import secureLocalStorage from "react-secure-storage";

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
  <ViewLogo />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-success-withd-prix-sm'>
  <ViewLogo />
 </div>
);
export const ViewLogo = () => {
 return (
  <>
   <ReturnIMAFlags IMA={'/img/franc.png'} />
   <h2>{(secureLocalStorage.getItem("@solde!#!")).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ')}</h2>
  </>
 );
};