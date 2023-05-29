import * as React from 'react';
import './Head.css';
import moment from 'moment';
import { VscCheck, VscCheckAll } from "react-icons/vsc";


let Acces = true;


function DrawerAppBar() {


 let first = JSON.parse(window.localStorage.getItem('--vie&&first**'))
 let last = JSON.parse(window.localStorage.getItem('--vie&&last**'))

 const str1 = first.charAt(0).toUpperCase() + first.slice(1);
 const str2 = last.charAt(0).toUpperCase() + last.slice(1);

 let pushDocs = JSON.parse(window.localStorage.getItem('%%docs&&col**'));

 if (Array.isArray(pushDocs) && pushDocs.length) {
  Acces = true;
 } else {
  Acces = false;
 }


 return (
  <div className='flex-head-list-cmd'>

   <header>
    <div className='container'>
     <nav className='navbar'>

      <span style={{ marginRight: '.5em' }}>{str1}</span>
      <span>{str2}</span>

     </nav>
    </div>
   </header>

   <section>

    {
     Acces ?
      <ul>
       {
        [...Array(pushDocs.length).keys()].map(index => {
         return (
          <li key={index}>

           <div className='box-data-cmd-list'>
            <div></div>
            <div>
             <h2>{moment(pushDocs[index].date).format('L')}</h2>
             <h2>{moment(pushDocs[index].date).format('LTS')}</h2>

            </div>
           </div>

           <div className='cmd-operator-title'>

            <div className='cmd-operator-sub-title'>
             <h3>Opérateur</h3>

             {[...Array(pushDocs[index].data.length).keys()].map(item => {

              let str = pushDocs[index].data[item].operator;
              let name = str[0].toUpperCase() + str.slice(1);
              let symbolOk = pushDocs[index].data[item].status ? <VscCheckAll size={'1.3em'} color='white' /> : <VscCheck size={'1.3em'} color='white' />;

              return (
               <div className='flex-row-other-cmd'>
                <p key={item}>{name}</p>
                <p>{symbolOk}</p>
               </div>
              )
             })}
            </div>

            <div className='cmd-operator-sub-title'>
             <h3>Quantité</h3>
             {[...Array(pushDocs[index].data.length).keys()].map(item => {

              let symbolOk = pushDocs[index].data[item].status ? <VscCheckAll size={'1.3em'} color='white' /> : <VscCheck size={'1.3em'} color='white' />;
              return (
               <div className='flex-row-other-cmd'>
                <p key={item}>{pushDocs[index].data[item].count}</p>
                <p>{symbolOk}</p>
               </div>
              )
             })}

            </div>

            <div className='cmd-operator-sub-title'>
             <h3>Prix</h3>
             {[...Array(pushDocs[index].data.length).keys()].map(item => {

              let symbol = pushDocs[index].data[item].devise === 'USD' ? '$' : 'F';
              let symbolOk = pushDocs[index].data[item].status ? <VscCheckAll size={'1.3em'} color='green' /> : <VscCheck size={'1.3em'} color='green' />;

              return (
               <div className='flex-row-cmd'>
                <p key={item}>{pushDocs[index].data[item].price} {symbol}</p>
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