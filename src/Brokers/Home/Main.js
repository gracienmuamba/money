import ReturnHm from './Home';
import React from 'react';
import { gsap, Expo } from 'gsap';
import { useNavigate } from 'react-router-dom';

// Home Component Brokers
export default function HmBroKers() {

 const navigation = useNavigate();
 React.useEffect(() => {

  JSON.parse(window.localStorage.getItem('ACTIVE_M_USER')) != true && navigation('/sign');
  window.setTimeout(() => {
   gsap.to('.App-loading-blank', 0, { delay: .2, x: '-1000%', opacity: 0, ease: Expo.easeIn })
  }, 100);

 }, []);

 return (
  <>
   <div className='App-loading-blank'></div>
   <ReturnHm />
  </>
 );
}