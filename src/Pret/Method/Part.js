import React from 'react';
import { TweenMax, Expo } from 'gsap';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from "react-secure-storage";


// View all 
export default function ReturnPart() {

 let link = secureLocalStorage.getItem("solde&&%%¢pret");
 const navigation = useNavigate();

 React.useEffect(() => {
  TweenMax.from('.Anima2', 1.2, { delay: .8, opacity: 0, x: -20, ease: Expo.easeIn });
 }, []);

 const handlepath = (event) => {
  event.preventDefault();
  navigation(link);
 }

 return (
  <div onClick={handlepath} className='all-pret-method Anima2'>
   <img src={'/img/refund.png'} />
   <p>Partie</p>
  </div>
 )
};