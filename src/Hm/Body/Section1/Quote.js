import './Quote.css';
import Media from 'react-media';


// import Quote component 
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
 )
};

export const ScreenLarge = () => (
 <div className='section-hm-quote'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='section-hm-quote-sm'>
  <View />
 </div>
);
export const View = () => (
 <>
  <p>
   Envoyez, dépensez et économisez plus rapidement avec MUUNGANOMONEY
 </p>

  <div className='Essentiels-section-1'>Investissements</div>
 </>
);