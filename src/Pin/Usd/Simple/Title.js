
import './Title.css';
import Media from 'react-media';

// Return Title component 
export default function ReturnTitle() {
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
 <div className='wrp-title-exchange-fc'>
  <ViewText />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-title-exchange-fc-sm'>
  <ViewText />
 </div>
);
export const ViewText = () => (
 <h2>Valider transaction</h2>
);