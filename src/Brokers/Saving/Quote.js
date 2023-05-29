import React from 'react';
import Media from 'react-media';
import { TweenMax, Expo } from 'gsap';


// Return Quote Component
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
     {matches.medium && <ScreenLarge />}
     {matches.large && <ScreenLarge />}
    </>
   )}
  </Media>
 );
};


export const ScreenLarge = () => (
 <ViewQuote />
)
export const ScreenSmall = () => (
 <ViewQuote />
)
export const ViewQuote = () => {

 React.useEffect(() => {
  TweenMax.from('.Anima', 1.2, { delay: 1, opacity: 0, y: 20, ease: Expo.easeInOut });

 }, []);

 return (
  <p style={{ padding: '1em', maxWidth: '50vw', width: '100%' }} className='Anima'>
   Ce numéro vient d'être ajouté à votre list de fiat, reconnu comme numéro enfant.
  </p>
 );
};