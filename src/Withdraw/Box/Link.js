import './Link.css';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import { ReturnFrAnc, ReturnDollArs } from './IMA';


//  REturn link withdraw
export default function REturnLinK() {
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
 <div className='wrp-link-withdraw'>
  <Dollars Text={'USD'} />
  <Fran Text={'CDF'} />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-link-withdraw-sm'>
  <Dollars Text={'USD'} />
  <Fran Text={'CDF'} />
 </div>
);

export const Fran = (props) => {

 const navigation = useNavigate();
 const handlepath = (event) => {
  event.preventDefault();
  navigation('/fran');
 };

 return (
  <buttton onClick={handlepath} className='Btn margin-link-button'>
   <span>{props.Text}</span><ReturnFrAnc />
  </buttton>
 );
};
export const Dollars = (props) => {

 const navigation = useNavigate();
 const handlepath = (event) => {
  event.preventDefault();
  navigation('/usd');
 };

 return (
  <buttton onClick={handlepath} className='Btn'>
   <span>{props.Text}</span><ReturnDollArs />
  </buttton>
 );
};