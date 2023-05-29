
import './Quote.css';
import Media from 'react-media';

// Quote view Compoennt 
export default function REturnQuOte() {
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
 <div className='wrp-quote-phone'>
  <ViewQuote />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-quote-phone-sm'>
  <ViewQuote />
 </div>
);
const ViewQuote = () => (
 <p>
  Spécifiez un numero pour le compte client.
 </p>
);