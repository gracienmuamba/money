import * as React from 'react';
import './Head.css';
import ReturnProfil from './Profil';

let Acces = true;

function DrawerAppBar() {

 const pushDocs = JSON.parse(window.localStorage.getItem('&&$$!@lis::**swap++'));
 if (Array.isArray(pushDocs) && pushDocs.length) {
  Acces = true;
 } else {
  Acces = false;
 }

 return (
  <div className='flex-head-list-last'>

   <header>
    <div className='container'>
     <nav className='navbar'>
      <ReturnProfil />

     </nav>
    </div>
   </header>

   <section>
    {
     Acces ?
      <ul>
       {
        Array.from(Array(JSON.parse(window.localStorage.getItem('&&lis++$$!@lis::**||{}'))).keys()).map(index => {

         return (
          <li key={index}>

           <div className='box-data-cmd-list-time'>
            <div></div>
            <div>
             <h2>{(pushDocs[index].date)} PM</h2>
            </div>
           </div>

           <div className='cmd-operator-title'>

            <div className='cmd-operator-sub-title'>
             <h3>Quantité</h3>
             <p>{(pushDocs[index].type).charAt(0).toUpperCase() + (pushDocs[index].type).slice(1)} {(pushDocs[index]).solde}</p>
            </div>

            <div className='cmd-operator-sub-title'>
             <h3>Identiter</h3>
             <p>{(pushDocs[index].user)}</p>

            </div>

            <div className='cmd-operator-sub-title'>
             <h3>Numero</h3>
             <p>{(pushDocs[index].phone)}</p>

            </div>


           </div>

          </li>
         )


        })}
      </ul>

      : <div></div>
    }

   </section>

  </div>
 );
}

export default DrawerAppBar;