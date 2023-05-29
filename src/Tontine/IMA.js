import React from 'react';
import './IMA.css';
import Media from 'react-media';
import { TweenMax } from 'gsap';


// view iamges tonie circle
export default function ReturnIMA() {
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
     {matches.medium && <ScreenMedium />}
     {matches.large && <ScreenLarge />}
    </>
   )}
  </Media>
 );
};

export const ScreenLarge = () => (
 <div className='wrp-tontine-images'>
  <View />
 </div>
);
export const ScreenMedium = () => (
 <div className='wrp-tontine-images-md'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-tontine-images-sm'>
  <View />
 </div>
);

export const View = () => {


 React.useEffect(() => {
  TweenMax.to('.circle', 10, { delay: 5, rotation: 340, repeat: -1, yoyo: true });

 }, []);

 return (
  <img src={'/img/tontine.png'} className='circle' />
 )
};