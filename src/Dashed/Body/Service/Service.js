import ReturnNaV from './Nav';
import Media from 'react-media';
import HmPuRchAse from './Purchase/Main';

// / view prix balance 
export default function ReturnSeRvice() {
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
  <HmPuRchAse />
 </>
);