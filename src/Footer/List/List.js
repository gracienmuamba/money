import './List.css';
import ReturnProduct from './Product';
import ReturnExploRe from './Explore';
import ReturnLegAl from './Legal';
import Media from 'react-media';


export default function ReturnList() {
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
 <div className='wrp-list-footer'>
  <ReturnProduct />
  <ReturnExploRe />
  <ReturnLegAl />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-list-footer-sm'>
  <ReturnProduct />
  <ReturnExploRe />
  <ReturnLegAl />
 </div>
);