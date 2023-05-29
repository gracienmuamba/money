
import './Footer.css';
// import LogoIMA from './Logo/Main';
import ListFooter from './List/Main';
import SociAl from './Social/Main';
import Media from 'react-media';

// Return Footer Main 
export default function ReturnFooteR() {
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
 <div className='wrp-footer-money'>

  <ViewSpan />
  <ListFooter />
  <SociAl />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-footer-money-sm'>

  <ViewSpan />
  <ListFooter />
  <SociAl />
 </div>
);
export const ViewSpan = () => (
 <div>
  <span style={{ fontSize: '1.2em' }} className='red-ungamamoney'>Muungano</span>
  <span style={{ fontSize: '1.2em' }} className='yellow-ungamamoney'>Money</span>
 </div>
);