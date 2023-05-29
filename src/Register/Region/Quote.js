
import React from 'react';
import './Quote.css';
import Media from 'react-media';
import { TweenMax, Power3 } from 'gsap';

// Quote view Compoennt 
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
  <div className='wrp-quote-region'>
   <ViewText />
  </div>
 )
}
export const ScreenSmall = () => {
 return (
  <div className='wrp-quote-region-sm'>
   <ViewText />
  </div>
 )
};

export const ViewText = () => {

 React.useEffect(() => {
  TweenMax.from('.quote-anime', .5, { delay: 1, opacity: 0, y: 5, ease: Power3.easeIn });
 }, []);

 return (
  <p className='quote-anime'>
   Les comptes personnels sont destinés aux particuliers et les comptes commerciaux.
  </p>
 )
}