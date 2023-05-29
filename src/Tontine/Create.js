import './Create.css';
import ReturnFooteR from './Footer';
import { useNavigate } from 'react-router-dom';


// /Create Component link
export default function RetuRnCreAte() {

 const navigation = useNavigate();
 const handlepath = (event) => {
  event.preventDefault();
  navigation('/tontine/form');
 }

 return (
  <div className='create-link-tontine'>
   <p onClick={handlepath}>Créer un groupe Tontine</p>
   <ReturnFooteR />
  </div>
 );
}