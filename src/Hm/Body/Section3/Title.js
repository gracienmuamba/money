import './Title.css';
import Media from 'react-media';

// View Component 
export default function ReturnTitle() {
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
 <div className='title-section-3'>
  <View />
 </div>
);
export const ScreenMedium = () => (
 <div className='title-section-3-md'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='title-section-3-sm'>
  <View />
 </div>
);
export const View = () => (
 <h3>Découvrir les fonctionnalités de MuunganoMoney</h3>
)