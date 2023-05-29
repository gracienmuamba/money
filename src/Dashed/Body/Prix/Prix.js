import './Prix.css';
import ReturnNaV from './Nav';
import ReturnBalance from './Balance';
import Media from 'react-media';

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
  <ReturnNaV />
  <ReturnBalance />
 </>
);