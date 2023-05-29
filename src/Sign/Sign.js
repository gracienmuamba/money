import REturnInPutCode from './Input';
import './Sign.css';
// import REturnArroW from './Arrow';
import Media from 'react-media';


// view sign export element
export default function REturnSignUp() {
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
 <div className='wrp-sign-up'>
  <ViewText />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-sign-up-sm'>
  <ViewText />
 </div>
);
export const ViewText = () => (
 <>
  <REturnInPutCode />
 </>
);