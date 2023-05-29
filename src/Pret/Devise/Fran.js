import React from 'react';
import './Fran.css';
import { useNavigate } from 'react-router-dom';
import { TweenMax, Expo } from 'gsap';

// Return Fran 
export default function ReturnFrAn() {

 const navigation = useNavigate();

 const handlepath = (event) => {

  event.preventDefault();
  window.localStorage.setItem('^^&&register__pret', JSON.stringify(true));
  navigation('/pret/fran/register');

 }


 React.useEffect(() => {
  TweenMax.from('.AnimFran', 1.2, { delay: 1, opacity: 0, x: 20, ease: Expo.easeInOut })

 }, []);

 return (
  <div className='devise-pret-money AnimFran'>
   <img onClick={handlepath} src={'/img/franc.png'} />

  </div>
 );
};