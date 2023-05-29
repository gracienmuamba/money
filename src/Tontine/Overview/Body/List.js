import React from 'react';
import Media from 'react-media';
import './List.css';


// Avatar IMAGE VIew
export default function ReturnLisT() {
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
  <div className='profile-user-child-tontine'>
   <View />
  </div>
 );
}
export const ScreenSmall = () => (
 <div className='profile-user-child-tontine'>
  <View />
 </div>
);
export const View = () => {

 let list = JSON.parse(window.localStorage.getItem('@@xi^^,view**++'));
 return (
  <div className='wrp-box-list-overview-bd-tontine'>
   {
    [...list].map((item) => {
     return (
      <>
       <div className='wrp-list-overview-bd-tontine'>
        <h4>{item}</h4>
        {/* <FiCheck size={'1.4345em'} color='#1b98e0' /> */}
       </div>
       <br />
      </>
     )
    })
   }
  </div>
 );
};