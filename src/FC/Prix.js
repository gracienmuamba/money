import React from 'react';
import './Prix.css';
import Media from 'react-media';


// REturn view Prix available
export default function REturnPriX(props) {
 return (
  <Media
   queries={{
    small: '(max-width: 599px)',
    medium: '(min-width: 600px) and (max-width:1199px)',
    large: '(min-width: 1200px)',
   }}>
   {matches => (
    <>
     {matches.small && <ScreenSmall count={props.count} />}
     {matches.medium && <ScreenLarge count={props.count} />}
     {matches.large && <ScreenLarge count={props.count} />}
    </>
   )}
  </Media>
 );
};

export const ScreenLarge = (props) => (
 <div className='wrp-prix-withdraw'>
  <WithdrawBalance count={props.count} />
 </div>
);
export const ScreenSmall = (props) => (
 <div className='wrp-prix-withdraw-sm'>
  <WithdrawBalance count={props.count} />
 </div>
);
export const WithdrawBalance = (props) => {

 let number = props.count;
 // number = (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ')

 return (
  <span style={{ color: `${props.count > 2000 ? '#000' : '#e0e0e0'}` }}>{(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ')}</span>
 );
};