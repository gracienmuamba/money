import './IMA.css';
import Media from 'react-media';

// IMAGE view component 
export default function ReturnIMA() {
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
 <div className='section-4-ima'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='section-4-ima-sm'>
  <View />
 </div>
);
export const View = () => (
 <img src={'/img/close-coffre.png'} />
);