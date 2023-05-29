import './Nav.css';
import Returnlogo from './Logo';
import Media from 'react-media';
import ReturnConnexion from './Btn';

// Nav component 
export default function ReturnNavHm() {
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
 <div className='wrp-nav-hm'>
  <View />
 </div>
)
export const ScreenSmall = () => (
 <div className='wrp-nav-hm-sm'>
  <View />
 </div>
);
export const View = () => (
 <>
  <Returnlogo />
  <ReturnConnexion />
 </>
)