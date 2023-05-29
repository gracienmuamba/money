import Media from 'react-media';
import './Save.css';
import ReturnNavBaR from './Nav';
import REturnInPutConnexIon from './Input';
import ReturnQuOte from './Quote';


// Broker home
export default function ReturnSAve() {
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
 <>
  <div className='wrp-hm-brokers'>
   <ReturnNavBaR />
   <ViewBroker />
  </div>
 </>
);
export const ScreenSmall = () => (
 <div className='wrp-hm-brokers'>
  <ReturnNavBaR />
  <ViewBroker />
 </div>
);
export const ViewBroker = () => (
 <>
  <div className='wrp-box-hm-brokers-save'>

   <ReturnQuOte />
   <REturnInPutConnexIon />
  </div>
 </>
);