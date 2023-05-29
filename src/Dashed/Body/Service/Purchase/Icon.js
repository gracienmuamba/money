import './Icon.css';
import Media from 'react-media';

// Icon Component 
export default function ReturnICOn(props) {
 return (
  <Media
   queries={{
    small: '(max-width: 599px)',
    medium: '(min-width: 600px) and (max-width:1199px)',
    large: '(min-width: 1200px)',
   }}>
   {matches => (
    <>
     {matches.small && <ScreenSmall IMA={props.IMA} />}
     {matches.medium && <ScreenLarge IMA={props.IMA} />}
     {matches.large && <ScreenLarge IMA={props.IMA} />}
    </>
   )}
  </Media>
 );
};


export const ScreenLarge = (props) => (
 <div className='icon-purchase-dashed'>
  <View IMA={props.IMA} />
 </div>
);
export const ScreenMedium = (props) => (
 <div className='icon-purchase-dashed-md'>
  <View IMA={props.IMA} />
 </div>
);
export const ScreenSmall = (props) => (
 <div className='icon-purchase-dashed-sm'>
  <View IMA={props.IMA} />
 </div>
);
export const View = (props) => (
 <img src={props.IMA} alt={'Alt icon view'} />
);