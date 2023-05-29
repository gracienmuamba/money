import './Box.css';
import ReturnListPurchAse from './List';
import Media from 'react-media';

// Box List 
export default function ReturnBoxPurchAse() {
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
 <div className='box-purchase-dashed'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='box-purchase-dashed'>
  <View />
 </div>
);
export const View = () => (
 <ReturnListPurchAse />
)