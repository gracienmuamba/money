import React from 'react';
import { TweenMax, Power3 } from 'gsap';
import { useNavigate } from 'react-router-dom';
import FadeLoader from 'react-spinners/FadeLoader';

// Btn Component Hm
export default function RetuRnBtn() {

 const navigation = useNavigate();
 const [loading, setLoading] = React.useState(false);

 let color = JSON.parse(window.localStorage.getItem('^^blue--color≥'));


 React.useEffect(() => {
  TweenMax.from('.wrp-btn-brokers button', 1, { delay: 1.4, opacity: 0, x: 0, ease: Power3.easeIn })
 }, []);

 const handlepath = (event) => {

  event.preventDefault();
  setLoading(true);

  window.setTimeout(() => {
   navigation('/brokers/unite/select');
  }, 2300)

 }

 return (
  <div className='wrp-btn-brokers'>
   {loading && <div className='App-Icon'>
    <FadeLoader
     size={15}
     color={color}
     loading={loading}
    />
   </div>}

   <button onClick={handlepath} className='Btn'>
    Continue
   </button>
  </div>
 );
};