import Media from 'react-media';
import ReturnBoxUniTe from './Box';
import './Unite.css';
import ReturnNavBaR from './Nav';

// Broker home
export default function ReturnUniTe() {
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
 <div className='wrp-hm-brokers-unite'>
  <ViewUniTe />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-hm-brokers-unite-sm'>
  <ViewUniTe />
 </div>
);
export const ViewUniTe = () => (
 <>
  <ReturnNavBaR />
  <ReturnBoxUniTe />
 </>
)