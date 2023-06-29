import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TweenMax, Expo } from 'gsap';

// Return Dollars Component
export default function ReturnDollArs() {

 const navigation = useNavigate();

 let namegroup = JSON.parse(window.localStorage.getItem('**tont>>name??'));

 const handlepath = (event) => {
  event.preventDefault();
  window.localStorage.setItem('**tont>>currency??', JSON.stringify(namegroup + 'usd'));
  navigation('/tontine/form/currency/usd');

 };

 React.useEffect(() => {
  TweenMax.from('.Anima', 1.2, { delay: 1, opacity: 0, x: -20, ease: Expo.easeInOut })
 }, []);



 return (
  <div onClick={handlepath} className='devise-pret-money Anima'>
   <img src={'/img/dollars.png'} />
   <p>USD</p>
  </div>
 );
};


