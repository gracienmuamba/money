import './Quote.css';
import Media from 'react-media';

// Return Quote Component
export default function ReturnQuOte() {
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
 <div className='wrp-quote-now'>
  <ViewQuote />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-quote-now-sm'>
  <ViewQuote />
 </div>
);
export const ViewQuote = () => (
 <p>Indiquez le code de connection actuel, s'il vous plaît</p>
);