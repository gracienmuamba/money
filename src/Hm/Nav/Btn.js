import './Btn.css';
import { useNavigate } from 'react-router-dom';

// View btn Component 
export default function ReturnConnexion() {

 const navigation = useNavigate();
 const handlepath = (event) => {

  event.preventDefault();
  navigation('/sign');

 }

 return (
  <div className='Btn-Connect'>
   <button onClick={handlepath}>Connexion</button>
  </div>
 );
}