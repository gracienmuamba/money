import React from 'react';
import './Profil.css';
import Media from 'react-media';
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';
import { phoneNum } from './Input';


// Avatar IMAGE VIew
export default function ReturnProfil() {
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

 let arrayClient = new Array();
 const [profil, setProfil] = React.useState(null);
 const [name, setName] = React.useState('');

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   arrayClient.push(doc.id);
  });

  const unsub = onSnapshot(doc(db, "client", `${phoneNum}`), (doc) => {
   setProfil(doc.data().profile);
   setName(doc.data().lastname);
  });

 }, []);

 const capitalized = name.charAt(0).toUpperCase() + name.slice(1);

 return (
  <>
   <div className='wrp-box-flex-child-tontine'>
    <img src={profil} className='user-avater-child-tontine' />
    <h3>{capitalized}</h3>
   </div>


   {/* <>
    {pushed &&
     <div onClick={handlepush} className='wrp-push-invited-icon-tontine'>
      <p>Invité Amie</p>
      <HiPlusSm color={'#929222'} size={'2em'} />
     </div>
    }
   </>
 */}



  </>
 );
};