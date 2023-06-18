
import React from 'react';
import './Date.css';
import Media from 'react-media'
import moment from 'moment';


// View Date Transaction Date
export default function ReturnDate() {
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
 <div className='wrp-time-exchange'>
  <ReturnTimestamp />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-time-exchange'>
  <ReturnTimestamp />
 </div>
);
export const ReturnTimestamp = () => {

 return (
  <>
   <h2>Date de la transaction</h2>
   <p>{moment().format('LLLL')}</p>
  </>
 );
};