import './Subject.css';
import Media from 'react-media';

// Subject profil component 
export default function ReturnSubJect() {
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
 <div className='wrp-subject-profil'>
  <h1>Profil de l'utilisateur</h1>
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-subject-profil-sm'></div>
);