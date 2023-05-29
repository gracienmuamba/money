import { TailSpin } from 'react-loader-spinner';

// Spinner Congo body 
export default function ReturnSpinner(props) {
 return (
  <TailSpin
   height="40"
   width="40"
   color="#00abe7"
   ariaLabel="tail-spin-loading"
   radius="1"
   wrapperStyle={{}}
   wrapperClass=""
   visible={props.loader}
  />

 );
};