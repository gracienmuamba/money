import ReturnQuOte from './Quote';
import ReturnIMA from './IMA';
import './Section.css';
import Media from 'react-media';

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
 <div className='section-2-flex'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='section-2-flex-sm'>
  <ReturnIMA />
  <ReturnQuOte />
 </div>
);
export const View = () => (
 <>
  <ReturnQuOte />
  <ReturnIMA />
 </>
)