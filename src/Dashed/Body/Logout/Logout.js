import './Logout.css';
import ReturnLogouTButton from './Btn';
import Media from 'react-media';


// FaQ Component view 
export default function ReturnLogOuT() {
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
 <div className='wrp-logout'>
  <View />
 </div>

);
export const ScreenSmall = () => (
 <div className='wrp-logout-sm'>
  <View />
 </div>
);
export const View = () => (
 <ReturnLogouTButton />
)