import React from 'react';
import './Logo.css';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';

// Return logo view 
export default function REturnlogo() {
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
  <div className='wrp-logo-sign'>
   <ViEw />
  </div>
 );
};
export const ScreenSmall = () => {
 return (
  <div className='wrp-logo-sign-sm'>
   <ViEw />
  </div>
 );
};

export const ViEw = () => {
 const navigation = useNavigate();
 return (
  <img src={'/img/logo.png'} onClick={() => navigation('/')} alt={'logo view '} className='Logo' />
 )
};