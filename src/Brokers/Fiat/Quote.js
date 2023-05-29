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
 <div className='fiat-add-brokers'>
  <ViewQuoTe />
 </div>
);
export const ScreenSmall = () => (
 <div className='fiat-add-brokers-sm'>
  <ViewQuoTe />
 </div>
);
export const ViewQuoTe = () => (
 <p>
  Identifiez les informations de votre nouveau fiat,
  assurez-vous qu'il n'a pas d'autre agent parent
 </p>
);