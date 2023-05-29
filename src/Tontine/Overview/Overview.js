import './Overview.css';
import NavBar from './Nav/Main';
import OverViewBody from './Body/Main';

// Group main tontine
export default function ReturnOverView() {
 return (
  <div className='wrp-tontine-group'>
   <NavBar />
   <OverViewBody />
  </div>
 );
};