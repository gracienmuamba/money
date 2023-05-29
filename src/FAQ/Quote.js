
import './Quote.css';
import Media from 'react-media';

// Return Quote ReturnFaQ
export default function ReturnQuote() {
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
 <div className='wrp-quote-faq'>
  <ViewText />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-quote-faq-sm'>
  <ViewText />
 </div>
);
export const ViewText = () => (
 <p>
  Chères Clients, toutes réclamations ou suggestions d'une
  transaction sont permises endéans 30 jours, en date d'une operation.
  Merci de votre fidelité à MuunganoMoney
 </p>
);