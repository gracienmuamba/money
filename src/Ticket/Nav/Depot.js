
// Title Return Compoennt
export default function ReturnDepot() {
 return (
  <div className='wrp-title-print-tickets-client'>
   <h2>DÉPÔT :</h2>
   <h2>{JSON.parse(window.localStorage.getItem('@solde!#!'))} {JSON.parse(window.localStorage.getItem('@unite!#!'))}</h2>
  </div>
 );
};