import Media from 'react-media';
import './Quote.css';


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
 <div className='wrp-fiat-brokers'>
  <ViewQuote />
 </div>
)
export const ScreenSmall = () => (
 <div className='wrp-fiat-brokers'>
  <ViewQuote />
 </div>
)
export const ViewQuote = () => (
 <p style={{ padding: '1em' }} className='quote-save'>
  Enregistrez numero d' un nouveau checkpoint sur votre liste fiate.
 </p>
);