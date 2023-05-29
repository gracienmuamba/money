import './Right.css';
import Media from 'react-media';


//  Left Compoent 
export default function ReturnRiht() {
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
     {matches.medium && <ScreenMediam />}
     {matches.large && <ScreenLarge />}
    </>
   )}
  </Media>
 );
};


export const ScreenLarge = () => (
 <div className='right-section-4'>
  <View />
 </div>
);
export const ScreenMediam = () => (
 <div className='right-section-4-md'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='right-section-4-sm'>
  <View />
 </div>
);
export const View = () => (
 <>
  <h4>Obtenez des récompenses exclusives et au fur et à mesure que vous dépensez</h4>
 </>
)