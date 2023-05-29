import './Quote.css';
import Media from 'react-media';

// Return Quote Component
export default function ReturnQuoTe() {
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
 <div className='wrp-qt-buy-brokers'>
  <ViewQuoTe />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-qt-buy-brokers-sm'>
  <ViewQuoTe />
 </div>
);
export const ViewQuoTe = () => (
 <p>
  Veuillez indiquer les numéros à créditer, sur les différents
  opérateurs établis. Assurez-vous qu'il commence par un zéro [ 0(***) ]
 </p>
);