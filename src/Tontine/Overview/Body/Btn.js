
import './Btn.css';
import { useNavigate } from 'react-router-dom';

// Btn
export default function ReturnBtn() {

 const navigation = useNavigate();

 const handlepath = (event) => {
  event.preventDefault();
  navigation('/tontine/form/pin');
 }

 return (
  <div className='wrp-btn-over-list'>
   <button onClick={handlepath} className='Btn'>Valider</button>
  </div>
 );
};