import './IMA.css';
import Media from 'react-media';

// View Component 
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
     {matches.medium && <ScreenMedium />}
     {matches.large && <ScreenLarge />}
    </>
   )}
  </Media>
 );
};

export const ScreenLarge = () => (
 <div className='ima-section-2'>
  <View />
 </div>
);
export const ScreenMedium = () => (
 <div className='ima-section-2-md'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='ima-section-2-sm'>
  <View />
 </div>
);
export const View = () => (
 <img src={'/img/checkpoint.jpeg'} />
);