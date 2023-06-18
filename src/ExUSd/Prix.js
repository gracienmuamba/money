import React from 'react';
import { TweenLite } from 'gsap';
import Media from 'react-media';
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

 const obj = { value: 0 };

 React.useEffect(() => {

  let target = document.querySelector('.valueTarget');
  TweenLite.to(obj, 5, {
   value: Math.floor(JSON.parse(window.localStorage.getItem('@solde!#!'))),
   roundProps: { value: 1 },
   onUpdate: () => target.innerHTML = obj.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ')
  })

 }, []);

 return (
  <>
   <ReturnIMAFlags IMA={'/img/dollars.png'} />
   <p className='valueTarget'></p>
  </>
 );
};