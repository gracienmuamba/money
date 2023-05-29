
import React from 'react';
import './Btn.css';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import { TweenMax, Power3 } from 'gsap';

// Register Btn view
export default function BtnRegion() {
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
  <div className='wrp-regions-btn'>
   <ScreenBtnPath />
  </div>
 )
};
export const ScreenSmall = () => {
 return (
  <div className='wrp-regions-btn-sm'>
   <ScreenBtnPath />
  </div>
 )
};

export const ScreenBtnPath = () => {

 const navigation = useNavigate();
 const handlepath = (event) => {
  event.preventDefault();
  navigation('/register/phone');
 };

 React.useEffect(() => {
  TweenMax.from('.Anime', .5, { delay: 1.2, opacity: 0, y: 5, ease: Power3.easeIn });
 }, []);

 return (
  <button onClick={handlepath} className='Btn Anime'>Continue</button>
 );
};
