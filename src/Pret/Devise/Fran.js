import React from 'react';
import './Fran.css';
import { useNavigate } from 'react-router-dom';
import { TweenMax, Expo } from 'gsap';
import secureLocalStorage from "react-secure-storage";

// Return Fran 
export default function ReturnFrAn() {

 const navigation = useNavigate();

 const handlepath = (event) => {

  event.preventDefault();
  secureLocalStorage.setItem("^^&&register__pret", true);
  navigation('/pret/fran/register');

 }

 React.useEffect(() => {
  TweenMax.from('.AnimFran', 1.2, { delay: 1, opacity: 0, x: 20, ease: Expo.easeInOut })

 }, []);

 return (
  <div onClick={handlepath} className='devise-pret-money AnimFran'>
   <img src={'/img/franc.png'} />
   <p>CDF</p>
  </div>
 );
};