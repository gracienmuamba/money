import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TweenMax, Expo } from 'gsap';
import secureLocalStorage from "react-secure-storage";

// Return Dollars Component
export default function ReturnDollArs() {

 const navigation = useNavigate();

 const handlepath = (event) => {

  event.preventDefault();
  secureLocalStorage.setItem("^^&&register__pret", true);
  navigation('/pret/register');
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
