import './Home.css';
import RetuRnTitle from './Title';
import ReturnIconShop from './IconShop';
import Media from 'react-media';
import ReturnBAck from './Back';

// Broker home
export default function ReturnHm() {
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
 <div className='wrp-hm-brokers'>
  <ReturnBAck />
  <ViewBroker />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-hm-brokers-sm'>
  <ReturnBAck />
  <ViewBroker />
 </div>
);
export const ViewBroker = () => (
 <div className='wrp-box-hm-brokers'>
  <RetuRnTitle />
  <ReturnIconShop />
 </div>
);