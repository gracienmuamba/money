
import './Welcome.css';
import GroupAvatars from './Avatargroup';

// view welcome
export default function ReturnWelCome() {
 return (
  <div className='welcome-tontine-quote'>
   <p>Bienvenue dans l'espace Tontine</p>
   <GroupAvatars />
  </div>
 );
};