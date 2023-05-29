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
     {matches.medium && <ScreenMedium />}
     {matches.large && <ScreenLarge />}
    </>
   )}
  </Media>
 )
};

export const ScreenLarge = () => (
 <div className='section2-quote'>
  <View />
 </div>
);
export const ScreenMedium = () => (
 <div className='section2-quote-md'>
  <View />
 </div>
);


export const ScreenSmall = () => (
 <div className='section2-quote-sm'>
  <View />
 </div>
);
export const View = () => (
 <>
  <h2>Payez et soyez payé, sans tracas</h2>
  <p>Découvrez des milliers checkpoint où MuunganoMoney est disponible.</p>
 </>
);