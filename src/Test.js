// import React from 'react';
// import './Test.css';
// import { auth } from './firebase';

// export default function ReturnTest() {

//  const contryCode = "+243";
//  const [phoneNumber, setPhoneNumber] = React.useState(contryCode);
//  const [expanForm, setExpanForm] = React.useState(false);


//  const generateRecaptcha = () => {

//   window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
//    'size': 'invisible',
//    'callback': (response) => {
//     // reCAPTCHA solved, allow signInWithPhoneNumber.
//    }
//   }, auth);

//  }
//  const requestOTp = (event) => {

//   event.preventDefault();
//   if (phoneNumber.length >= 13) {
//    setExpanForm(true);


//   }

//  };

//  return (
//   <div className='flex-input-output'>
//    <form>
//     <input type='phone' placeholder='phone number' />
//     <button>Send</button>

//     <div className='recaptcha-container'></div>

//    </form>
//   </div>
//  );
// };