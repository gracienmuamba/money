import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TweenMax, Expo } from 'gsap';

// Return Dollars Component
export default function ReturnDollArs() {

 const navigation = useNavigate();
 const handlepath = (event) => {

  event.preventDefault();
  window.localStorage.setItem('^^&&register__pret', JSON.stringify(true));
  navigation('/pret/register');

 }

 React.useEffect(() => {
  TweenMax.from('.Anima', 1.2, { delay: 1, opacity: 0, x: -20, ease: Expo.easeInOut })

 }, []);

 return (
  <div className='devise-pret-money Anima'>
   <img onClick={handlepath} src={'/img/dollars.png'} />
  </div>
 );

};
