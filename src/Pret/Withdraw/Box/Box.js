import './Box.css';
import REturnSuBJect from './SubJect';
import REturnLinK from './Link';
import REturnLine from './Line';
import Media from 'react-media';


// REturn Box component 
export default function REturnBoxWithdraw() {
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
 <div className='box-withdraw-money'>
  <REturnSuBJect />
  <REturnLinK />
  <REturnLine />
 </div>
);
export const ScreenSmall = () => (
 <div className='box-withdraw-money-sm'>
  <REturnSuBJect />
  <REturnLinK />
  <REturnLine />
 </div>
);