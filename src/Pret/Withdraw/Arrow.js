import React from 'react';
import './Arrow.css';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from "react-icons/fi";


export function BacK() {
 const navigation = useNavigate();
 return (
  <div className='wrp-back-brokers'>
   <div onClick={() => navigation(-1)} className='wrp-back-box-brokers'>
    <FiChevronLeft size={'2em'} color='#000' />
    <span>Prêt</span>
   </div>
  </div>
 );
};


// REturn Arrow component 
export default function REturnArroW() {

 return (
  <Media
   queries={{
    small: '(max-width: 599px)',
    medium: '(min-width: 600px) and (max-width:1199px)',
    large: '(min-width: 1200px)',
   }}>
   {matches => (
    <>
     {matches.small && <ScreenSmall />}
     {matches.medium && <ScreenLarge />}
     {matches.large && <ScreenLarge />}
    </>
   )}
  </Media>
 );
};

export const ScreenLarge = () => (
 <div className='wrp-arrow-pret-profil'>
  <Arrow />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-arrow-pret-profil-sm'>
  <Arrow />

 </div>
);
export const Arrow = () => {
 return (
  <BacK />
 );
}