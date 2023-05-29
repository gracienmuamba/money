import './IMA.css';
import { useNavigate } from 'react-router-dom';

// Return IMA
export default function ReturnIMA() {

 const navigation = useNavigate();

 const handlePath = (event) => {
  event.preventDefault()
  navigation('/profil')

 }

 return (
  <div onClick={handlePath} className='head-img-dashed'>
   <img src={'/img/account-settings.png'} alt='images dash muungano' />
  </div>
 );
};