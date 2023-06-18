import React from 'react';
import { TweenLite } from 'gsap';
import Media from 'react-media';
import './Prix.css';
import ReturnIMAFlags from './Flags';

// Prix View Component 
export default function ReturnPriX() {
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
 <div className='wrp-prix-exchange'>
  <ViewText />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-prix-exchange'>
  <ViewText />
 </div>
);
export const ViewText = () => {

 const obj = { value: 500 };
 React.useEffect(() => {

  let target = document.querySelector('.valueTarget');
  TweenLite.to(obj, 1, {
   value: Math.floor(JSON.parse(window.localStorage.getItem('@solde!#!'))),
   roundProps: { value: 10 },
   onUpdate: () => target.innerHTML = obj.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ')
  });
 }, []);

 return (
  <>
   <ReturnIMAFlags IMA={'/img/franc.png'} />
   <p className='valueTarget'></p>
  </>
 );
};