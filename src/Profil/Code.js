import React from 'react';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import { FcSynchronize } from 'react-icons/fc';

// This is Name view 
export default function ReturnCodeAccessSetting() {
 return (
  <Media
   queries={{
    small: '(max-width: 599px)',
    medium: '(min-width: 600px) and (max-width:1199px)',
    large: '(min-width: 1200px)',
   }}>
   {matches => (
    <>
     {matches.small && <ScreenLarge />}
     {matches.medium && <ScreenLarge />}
     {matches.large && <ScreenLarge />}
    </>
   )}
  </Media>
 );
};

export const ScreenLarge = () => {

 const navigation = useNavigate();
 const handlepath = (event) => {
  event.preventDefault();
  navigation('/code/now');
 }

 return (
  <div onClick={handlepath} className='wrp-name-profil cursor-pin'>

   <div className='wrp-boxname-profil'>
    <FcSynchronize size={'2em'} color={'red'} />
    <div className='profil-name-identity'>
     <h1>Modifier Code d'accès</h1>
     <ReturnPeople />
     <ViewText />
    </div>
   </div>
  </div>
 );
};
export const ViewText = () => (
 <p>
  Code d'access utilisateur du compte MuunganoMoney.
 </p>
);
export const ReturnPeople = () => {
 return (
  <h2>**********</h2>
 );
};