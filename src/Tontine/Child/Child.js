import './Child.css';
import NavBar from './Nav/Main';
import ChildBody from './Body/Main';

// Group main tontine
export default function ReturnChild() {
 return (
  <div className='wrp-tontine-group'>
   <NavBar />
   <ChildBody />
  </div>
 );
};