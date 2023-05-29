
import React from 'react';
import './Success.css';
import { VscCheck } from 'react-icons/vsc';
import { TweenMax, Expo } from 'gsap';
import Media from 'react-media';

// Button Success view
export default function ReturnSucsess() {
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
 <div className='wrp-success-btn'>
  <ViewText />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-success-btn-sm'>
  <ViewText />
 </div>
);
export const ViewText = () => {

 React.useEffect(() => {

  TweenMax.from('.Anime', 1, { delay: 1.5, opacity: 0, y: 0, ease: Expo.ease });
  TweenMax.from('.Anime-Text', 1.2, { delay: 2.3, opacity: 0, y: 4, ease: Expo.ease });

 }, []);

 return (
  <>
   <span className='Anime'><VscCheck size={'2em'} /></span>
   <p className='Anime-Text'>Envoyer avec success</p>
  </>
 );
};