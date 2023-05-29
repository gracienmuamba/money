import './Prix.css';
import ReturnBalance from './Balance';
import Media from 'react-media';
import ReturnBTn from './Btn';
import ReturnProfil from './Profil';
import moment from 'moment';


// / view prix balance 
export default function ReturnPrix() {
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
 <div className='prix-body-pret-balance'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='prix-body-pret-balance-sm'>
  <View />
 </div>
);
export const View = () => {
 return (
  <>
   <ReturnProfil />
   <ReturnBalance />
   <ReturnBTn />
  </>
 );
};