
import './Line.css';
import Media from 'react-media';

// REturn Line
export default function REturnLine() {
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
 <div className='wrp-line-widthdraw'></div>
);
export const ScreenSmall = () => (
 <div className='wrp-line-widthdraw-sm'></div>
);