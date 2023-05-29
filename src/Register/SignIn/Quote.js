
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
 <div className='wrp-quote-signin'>
  <ViewQuote />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-quote-signin-sm'>
  <ViewQuote />
 </div>
);
const ViewQuote = () => (
 <div>
  {/* <p>Utilisation the numero telephone  to inscire avec UngamaMoney</p> */}
 </div>
);