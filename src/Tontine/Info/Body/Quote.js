import './Quote.css';
import currency from 'currency.js';

// Quote Component Info
export default function ReturnQuoTe() {

 let devise = JSON.parse(window.localStorage.getItem('**tont>>currency??'));
 let name = JSON.parse(window.localStorage.getItem('**tont>>name??'));
 let count = JSON.parse(window.localStorage.getItem('**tont>>count??'));

 var euro = value => currency(value, { separator: ' ', decimal: '.', symbol: '' });
 euro(count).format();

 return (
  <div className='qt-info-tontine'>

   <div className='title-qt-info-tontine'>
    <p>Groupe Tontine : </p>
    <p>{name}</p>
   </div>

   <div className='title-qt-info-tontine'>
    <p>Devise Utiliser : </p>
    <p>{devise.toUpperCase()}</p>
   </div>

   <div className='title-qt-info-tontine'>
    <p>Argent Tontine : </p>
    <p>{euro(count).format()}</p>
   </div>
  </div>
 );
};