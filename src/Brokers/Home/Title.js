import React from 'react';
import './Title.css';
import { TweenMax, Power3 } from 'gsap';
import RetuRnBtn from './Btn';
import Media from 'react-media';

// Return Title
export default function RetuRnTitle() {
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
 <div className='wrp-title-hm-broker'>
  <ViewTitle />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-title-hm-broker-sm'>
  <ViewTitle />
 </div>
);
export const ViewTitle = () => {

 React.useEffect(() => {
  TweenMax.from('.Anima h1', 1.4, { delay: .5, x: -10, opacity: 0, ease: Power3.easeIn });
  TweenMax.from('.Anima p', 2.4, { delay: .9, x: -10, opacity: 0, ease: Power3.easeIn });
 }, []);

 return (
  <div className='Anima'>
   <h1>Bienvenue</h1>
   <p>
    MuunganoMoney, il vous permet d'obtenir différents produits
    muungano que nous mettons à votre disposition, selon votre demande
    cliquez ci-dessus.
    </p>
   <RetuRnBtn />
  </div>
 );
};