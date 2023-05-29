import React from 'react';
import './SignIn.css';
import REturnTitle from './Title';
import ReturnInput from './Input';
import PretNav from './Nav/Main';


// View Sign In 
export default function ReturnSignInRegister() {

 const refContainer = React.useRef(null);
 React.useEffect(() => { refContainer.current.scrollIntoView({ behavior: "smooth" }); });

 return (
  <div ref={refContainer}>
   <PretNav />
   <div className='wrp-signin-register'>
    <REturnTitle />
    <ReturnInput />
   </div>
  </div>
 );
};