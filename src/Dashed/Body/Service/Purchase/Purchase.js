import Media from 'react-media';
import ReturnBoxPurchAse from './Box';

// Broker home
export default function ReturnPuRchase() {
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
 <div className='wrp-hm-purschase-dashed'>
  <ViewBroker />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-hm-purschase-dashed'>
  <ViewBroker />
 </div>
);
export const ViewBroker = () => (
 <>
  <ReturnBoxPurchAse />
 </>
);