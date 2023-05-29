import './Btn.css';
import RegisBtn from './RegisBtn';
import Media from 'react-media';


// Btn component view 
export default function REturnBtn() {
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
 <div className='wrp-regisbtn'>
  <RegisBtn />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-regisbtn-sm'>
  <RegisBtn />
 </div>
);