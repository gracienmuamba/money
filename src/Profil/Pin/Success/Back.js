import './Back.css';
import { useNavigate } from 'react-router-dom';

// Return Back
export default function ReturnBacK() {

 const navigaton = useNavigate();
 const handlepath = (event) => {
  event.preventDefault();
  navigaton('/dash');
 }

 return (
  <div onClick={handlepath} className='wrp-link-back'>
   <p>Retour au dash</p>
  </div>
 );
};