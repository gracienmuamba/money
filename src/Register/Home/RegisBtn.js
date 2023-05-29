import React from 'react';
import './RegisBtn.css';
import { useNavigate } from 'react-router-dom';
import { TweenMax, Expo } from 'gsap';
import Media from 'react-media';



// Register Btn view
export default function RegisBtn() {
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
  <div className='wrp-Btn-Register'>
   <View />
  </div>
 );
};
export const ScreenSmall = () => {
 return (
  <div className='wrp-Btn-Register-sm'>
   <View />
  </div>
 );
};

export const View = () => {

 const navigation = useNavigate();

 const handleNavigation = (event) => {
  event.preventDefault();
  navigation('/register/region');
 };
 React.useEffect(() => {
  TweenMax.from('.btn-transition', 1, { delay: .7, y: 30, opacity: 0, ease: Expo.easeIn })

 }, [])

 return (
  <button className='Btn' onClick={handleNavigation}>Enregistrez nouveaux client</button>
 );

}