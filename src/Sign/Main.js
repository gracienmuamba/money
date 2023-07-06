import React from 'react';
import REturnSignUp from './Sign';
import { gsap, Expo } from 'gsap';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from "react-secure-storage";

// view sign available
export default function SignUp() {

 const navigation = useNavigate();

 React.useEffect(() => {

  secureLocalStorage.getItem("ACTIVE_M_USER") !== true && navigation('/sign');

  window.setTimeout(() => {
   gsap.to('.App-loading-blank', 0, { delay: .1, x: '-1000%', opacity: 0, ease: Expo.easeIn })
  }, 100);

 }, []);

 return (
  <>
   <div className='App-loading-blank'></div>
   <REturnSignUp />
  </>
 );
};