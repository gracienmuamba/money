import { FcShop } from 'react-icons/fc';
import Media from 'react-media';

// Icon Shop Component 
export default function ReturnIconShop() {
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
 <div className='wrp-iconshop-hm'>
  <ViewShop />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-iconshop-hm-sm'>
  <ViewShop />
 </div>
);
export const ViewShop = () => (
 <>
  <FcShop size={'2em'} />
  <p>Achat produit</p>
 </>
);