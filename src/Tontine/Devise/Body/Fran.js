import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TweenMax, Expo } from 'gsap';

// Return Fran 
export default function ReturnFrAn() {

 const navigation = useNavigate();
 const handlepath = (event) => {

  event.preventDefault();
  window.localStorage.setItem('**tont>>currency??', JSON.stringify('cdf'));
  navigation('/tontine/form/currency/cdf');

 }

 React.useEffect(() => {
  TweenMax.from('.AnimFran', 1.2, { delay: 1, opacity: 0, x: 20, ease: Expo.easeInOut })

 }, []);

 return (
  <div onClick={handlepath} className='devise-pret-money AnimFran'>
   <img src={'/img/franc.png'} />
   <p>Franc Congolais</p>
  </div>
 );
};