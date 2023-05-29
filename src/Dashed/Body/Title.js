import './Title.css';

// Return Title Component 
export default function ReturnTitle(props) {
 return (
  <div className='title-body-dashed'>
   <h2>{props.Text}</h2>
  </div>
 );
}