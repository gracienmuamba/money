import React from 'react';
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
 <div className='prix-withdraw-pret-asked'>
  <WithdrawBalance count={props.count} />
 </div>
);
export const ScreenSmall = (props) => (
 <div className='prix-withdraw-pret-asked-sm'>
  <WithdrawBalance count={props.count} />
 </div>
);
export const WithdrawBalance = (props) => {

 let number = props.count;
 number = (Math.abs(number)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ');
 return (
  <p style={{ color: `${props.count < 1 ? '#eff1ed' : '#000'}` }}>{number}</p>
 );
};
