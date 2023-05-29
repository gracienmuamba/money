import './Form.css';
import ReturnNavBar from './Nav/Main';
import TonTineBody from './Body/Main';

// Form component live 
export default function ReturnForm() {
 return (
  <div className='form-tontine'>
   <ReturnNavBar />
   <TonTineBody />
  </div>
 );
};