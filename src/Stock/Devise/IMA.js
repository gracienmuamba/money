import './IMA.css';
import anime from "animejs/lib/anime.es.js";

// IMA Component 
export default function ReturnIMA(props) {

 return (
  <div className='devise-ima'>
   <img src={props.IMA} />
  </div>
 );
}