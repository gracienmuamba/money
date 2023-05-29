import './Body.css';
import Media from 'react-media';
import ReturnIcon from './Icon';
import ReturnQuOTe from './Quote';
import ReturnBtn from './Btn';


// Return Body view
export default function ReturnBody() {
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
 <div className='wrp-body-form-tontine'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-body-form-tontine-sm'>
  <View />
 </div>
);
export const View = () => {
 return (
  <>
   <ReturnIcon />
   <ReturnQuOTe />
   <ReturnBtn />
  </>
 );

}