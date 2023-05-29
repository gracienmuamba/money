import './SignIn.css';
import REturnQuOte from './Quote';
import ReturnInput from './Input';
import ReturnNavBaR from './Nav';

// View Sign In 
export default function ReturnSignInRegister() {
 return (
  <>
   <ReturnNavBaR />

   <div className='wrp-signin-register'>

    <REturnQuOte />
    <ReturnInput />
   </div>
  </>
 );
};