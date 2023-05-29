import React from 'react';
import './Name.css';
import Media from 'react-media';
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../../firebase';


//  Exchange View Name
export default function ReturnName() {
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
 <div className='name-head-wallet-slide'>
  <ReturnPeople />
 </div>
);
export const ScreenSmall = () => (
 <div className='name-head-wallet-slide'>
  <ReturnPeople />
 </div>
);
export const ReturnPeople = () => {
 return (
  <h2>Prêt</h2>
 )
};