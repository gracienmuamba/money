import './Section.css';
import ReturnLeFt from './Left';
import ReturnRiht from './Right';
import Media from 'react-media';

// Section 
export default function ReturnSectIOn() {
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
 <div className='flex-section4'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='flex-section4-sm'>
  <View />
 </div>
);
export const View = () => (
 <>
  <ReturnLeFt />
  <ReturnRiht />
 </>
)