import React from 'react';
import './Btn.css';
import { useNavigate } from 'react-router-dom';
import FadeLoader from 'react-spinners/FadeLoader';
import { TweenMax, Power3 } from 'gsap';
import { VscChevronRight } from 'react-icons/vsc';

// Btn Component Hm
export default function RetuRnBtn() {

 const navigation = useNavigate();
 const [loading, setLoading] = React.useState(false);

 React.useEffect(() => {
  TweenMax.from('.wrp-btn-brokers button', 1, { delay: 1.4, opacity: 0, x: 0, ease: Power3.easeIn })
 }, []);
 const handlepath = (event) => {

  event.preventDefault();
  setLoading(true);
  window.setTimeout(() => {
   navigation('/brokers/purchase');
  }, 2300);

 };

 return (
  <div className='wrp-btn-brokers'>
   {loading && <div className='App-Icon'>
    <FadeLoader
     size={15}
     color={'#596475'}
     loading={loading}
    />
   </div>}

   <button onClick={handlepath} className='btn-broker'>
    <span>Aller</span>
    <VscChevronRight size={'1.7em'} />
   </button>
  </div>
 );
};