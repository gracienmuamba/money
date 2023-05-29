
import React from 'react';
import './Quote.css';
import Media from 'react-media';
import { TweenMax, Expo } from 'gsap';

// REturn Quote 
export default function REturnQuOte(props) {
 return (
  <Media
   queries={{
    small: '(max-width: 599px)',
    medium: '(min-width: 600px) and (max-width:1199px)',
    large: '(min-width: 1200px)',
   }}>
   {matches => (
    <>
     {matches.small && <ScreenSmall Text={props.Text} />}
     {matches.medium && <ScreenLarge Text={props.Text} />}
     {matches.large && <ScreenLarge Text={props.Text} />}
    </>
   )}
  </Media>
 );
};
export const ScreenLarge = (props) => {
 return (
  <div className='wrp-quote-sign'>
   <ViewText Text={props.Text} />
  </div>
 )
};
export const ScreenSmall = (props) => {
 return (
  <div className='wrp-quote-sign-sm'>
   <ViewText Text={props.Text} />
  </div>
 )
};
export const ViewText = (props) => {
 React.useEffect(() => {
  TweenMax.from('.Anime', 1.5, { delay: .5, opacity: 0, y: 0, ease: Expo.easeIn });
 }, []);
 return (
  <p className='Anime'>{props.Text}</p>
 );
};