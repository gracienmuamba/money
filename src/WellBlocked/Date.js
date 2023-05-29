import React from 'react';
import Media from 'react-media';
import moment from 'moment';

// Return Date 
export default function RetuRnDate() {
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
 <div className='wrp-date-fcwell'>
  <ViewTimesTamp />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-date-fcwell-sm'>
  <ViewTimesTamp />
 </div>
);
export const ViewTimesTamp = () => {
 return (
  <p>{moment().format('LLLL')}</p>
 );
};