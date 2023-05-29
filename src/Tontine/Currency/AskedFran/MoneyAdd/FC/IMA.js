import React from 'react'
import { TweenMax, Power0 } from 'gsap';

// View IMA Component
export default function ReturnIMA(props) {

 React.useEffect(() => {
  TweenMax.from('.wrp-ima-send img', .8, { delay: 2.5, y: 10, opacity: 0, ease: Power0.easeInOut })

 }, []);

 return (
  <div className='wrp-ima-send'>
   <img src={props.IMA} alt={'money'} />
  </div>
 );
}