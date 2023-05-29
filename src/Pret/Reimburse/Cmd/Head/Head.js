import * as React from 'react';
import './Head.css';
import moment from 'moment';
import { VscCheck, VscCheckAll } from "react-icons/vsc";
import ReturnProfil from './Profil';
import currency from 'currency.js';


let Acces = true;

function DrawerAppBar() {
 const pushDocs = JSON.parse(window.localStorage.getItem('%%docs&&col**pret'));

 if (Array.isArray(pushDocs) && pushDocs.length) {
  Acces = true;
 } else {
  Acces = false;
 }

 return (
  <div className='flex-head-list-reimburse'>

   <header>
    <div className='container'>
     <nav className='navbar'>
      <ReturnProfil />

     </nav>
    </div>
   </header>

   <section>

    {Acces ?
     <div className='title-pret-reimburse'>
      <>
       <h2>Vos remboursement en</h2>
       {pushDocs[0].devise ? <h2 className='color'>usd</h2> : <h2 className='color'>cdf</h2>}
      </>
     </div>
     :
     <div></div>
    }

    {
     Acces ?
      <ul>
       {
        [...Array(pushDocs.length).keys()].map(index => {
         return (
          <li key={index}>

           <div className='box-data-cmd-list-time'>
            <div></div>
            <div>
             <h2>{moment(pushDocs[index].date).format('LLLL')}</h2>

            </div>
           </div>

           <div className='cmd-operator-title'>

            <div className='cmd-operator-sub-title'>
             <h3>Prêt initial</h3>
             {[...Array(pushDocs[index].data.length).keys()].map(item => {

              let symbolOk = pushDocs[index].data[item].status ? <VscCheckAll size={'1.3em'} color='white' /> : <VscCheck size={'1.3em'} color='white' />;

              return (
               <div className='flex-row-cmd'>
                <p key={item}>{currency((pushDocs[index].data[item].pret), { separator: ' ', symbol: '' }).format()}</p>
                <p style={{ color: 'transparent' }}>{symbolOk}</p>
               </div>
              )
             })}
            </div>

            <div className='cmd-operator-sub-title'>
             <h3>Remboursé</h3>
             {[...Array(pushDocs[index].data.length).keys()].map(item => {

              let symbolOk = pushDocs[index].data[item].status ? <VscCheckAll size={'1.3em'} color='white' /> : <VscCheck size={'1.3em'} color='white' />;

              return (
               <div className='flex-row-cmd'>
                <p key={item}>{currency((pushDocs[index].data[item].reimburse), { separator: ' ', symbol: '' }).format()}</p>
                {/* <p key={item}>{pushDocs[index].data[item].reimburse}</p> */}


                <p style={{ color: 'transparent' }}>{symbolOk}</p>
               </div>
              )
             })}
            </div>

            <div className='cmd-operator-sub-title'>
             <h3>Prêt en cours</h3>
             {[...Array(pushDocs[index].data.length).keys()].map(item => {

              let symbol = pushDocs[index].data[item].devise === 'USD' ? '$' : 'F';
              let symbolOk = pushDocs[index].data[item].status ? <VscCheckAll size={'1.3em'} color='transparent' /> : <VscCheck size={'1.3em'} color='transparent' />;

              return (
               <div className='flex-row-cmd'>
                <p key={item}>{currency((pushDocs[index].data[item].current), { separator: ' ', symbol: '' }).format()}</p>
                {/* <p key={item}>{pushDocs[index].data[item].current}</p> */}
                <p>{symbolOk}</p>
               </div>
              )
             })}
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