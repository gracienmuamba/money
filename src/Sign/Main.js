import React from 'react';
import REturnSignUp from './Sign';
import { gsap, Expo } from 'gsap';
import { useNavigate } from 'react-router-dom';


// view sign available
export default function SignUp() {

 const navigation = useNavigate();

 React.useEffect(() => {
  JSON.parse(window.localStorage.getItem('ACTIVE_M_USER')) === false && navigation('/sign');

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