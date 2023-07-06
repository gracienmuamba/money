import React from 'react';
import './Arrow.css';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';



export function BacK() {
 const navigation = useNavigate();
 return (
  <div className='wrp-back-brokers'>
   <div onClick={() => navigation(-1)} className='wrp-back-box-brokers'>


    <Tooltip title="Retour">
     <IconButton>
      <HiArrowLeft size={'1.3em'} color={'grey'} />
     </IconButton>
    </Tooltip>

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