import React from 'react';
import './Quote.css';
import Media from 'react-media';
import { TweenMax, Power3 } from 'gsap';

// View Quote 
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

 React.useEffect(() => {
  TweenMax.from('.wrp-quote-valided', 1.2, { delay: 0.5, opacity: 0, y: 20, ease: Power3.easeIn });

 }, []);

 return (
  <div className='wrp-quote-valided'>
   <ViewText />
  </div>
 )
}
export const ScreenSmall = () => {

 React.useEffect(() => {
  TweenMax.from('.wrp-quote-valided-sm', 1.2, { delay: 0.5, opacity: 0, y: 20, ease: Power3.easeIn });

 }, []);

 return (
  <div className='wrp-quote-valided-sm'>
   <ViewText />
  </div>
 );
};


export const ViewText = () => (
 <p>
  Les fraudes par rétrofacturation entraînent une portée limitée du marché et une augmentation des prix, ce qui pénalise les clients.
 </p>
)