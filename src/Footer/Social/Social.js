
import './Social.css';
import { IoLogoTwitter } from 'react-icons/io';
import { IoLogoFacebook, IoLogoInstagram, IoLogoSnapchat } from 'react-icons/io5';
import Media from 'react-media';

// View Socal
export default function ReturnSociAl() {
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
 <div className='wrp-social-footer'>
  <IoLogoTwitter size={'1.4em'} />
  <IoLogoFacebook size={'1.4em'} />
  <IoLogoInstagram size={'1.4em'} />
  <IoLogoSnapchat size={'1.4em'} />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-social-footer-sm'>
  <IoLogoTwitter size={'1.4em'} />
  <IoLogoFacebook size={'1.4em'} />
  <IoLogoInstagram size={'1.4em'} />
  <IoLogoSnapchat size={'1.4em'} />
 </div>
);