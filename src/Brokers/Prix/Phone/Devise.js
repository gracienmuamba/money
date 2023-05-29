import React from 'react';
// import './Devise.css';
import { TweenMax, Power3 } from 'gsap';

// Import Image devise
export default function ReturnDevise(props) {

 React.useEffect(() => {
  TweenMax.from('.devise-ima-switch img', 1.2, { delay: .5, x: -20, opacity: 0, ease: Power3.ease });

 }, []);

 return (
  <div className='devise-ima-switch'>
   <img src={props.IMA} />
  </div>
 );
}