
import secureLocalStorage from "react-secure-storage";


// Title Return Compoennt
export default function ReturnDepot() {
 return (
  <div className='wrp-title-print-tickets-client'>
   <h2>DÉPÔT :</h2>
   <h2>{secureLocalStorage.getItem("@solde!#!")} {secureLocalStorage.getItem("@unite!#!")}</h2>
  </div>
 );
};