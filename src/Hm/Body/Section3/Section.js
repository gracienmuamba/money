import './Section.css';
import Media from 'react-media';
import ReturnTitle from './Title';
import ReturnList from './List';
// 
// Section 
export default function ReturnSectIOn() {
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
 <div className='section-3-flex'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='section-3-flex-sm'>
  <View />
 </div>
);
export const View = () => (
 <>
  <ReturnTitle />
  <ReturnList />
 </>
)