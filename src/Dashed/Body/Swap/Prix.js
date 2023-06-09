import './Prix.css';
import ReturnBalance from './Swap';
import Media from 'react-media';
import ReturnLasT from './Last';

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
 <div className='prix-body-dashed'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='prix-body-dashed-sm'>
  <View />
 </div>
);
export const View = () => (
 <>
  <ReturnBalance />
  <ReturnLasT />
 </>
);