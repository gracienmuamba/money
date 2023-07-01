import './Btn.css';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from "react-secure-storage";

// Btn view component 
export default function ReturnBtn() {
 return (
  <Media
   queries={{
    small: '(max-width: 599px)',
    medium: '(min-width: 600px) and (max-width:1199px)',
    large: '(min-width: 1200px)',
   }}>
   {matches => (
    <>
     {matches.small && <ScreenSmall />}
     {matches.medium && <ScreenLarge />}
     {matches.large && <ScreenLarge />}
    </>
   )}
  </Media>
 );
};

export const ScreenLarge = () => (
 <div className='btn-info-tontine-go-pin'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='btn-info-tontine-go-pin-sm'>
  <View />
 </div>
);
export const View = () => {

 const navigation = useNavigate();

 const handlepath = (event) => {
  event.preventDefault();
  window.localStorage.setItem('??next^^**$$', JSON.stringify(false));
  window.localStorage.setItem('@@xi^^,view**++', JSON.stringify([secureLocalStorage.getItem("USER")]));
  navigation('/tontine/group/child');
 };

 return (
  <button onClick={handlepath} className='Btn'>Avancer</button>
 );
};