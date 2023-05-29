import React from 'react';
import './Arrow.css';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import { GrFormPrevious } from 'react-icons/gr';


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

export const ScreenLarge = () => {
 return (
  <div className='wrp-arrw'>
   <Arrow />

  </div>
 )
};
export const ScreenSmall = () => {
 return (
  <div className='wrp-arrw-sm'>
   <Arrow />
  </div>
 )
};

export const Arrow = () => {

 return (
  <div className='wrp-icon'>
   <BacK />
  </div>
 );
};



export function BacK() {

 const navigation = useNavigate();
 const handlepath = (event) => {
  event.preventDefault();
  navigation(-1);
 }

 return (
  <div className='wrp-back-brokers'>
   <div onClick={handlepath} className='wrp-back-box-brokers'>
    <GrFormPrevious size={'2em'} />
    <span>Téléphone</span>
   </div>
  </div>
 );
};
