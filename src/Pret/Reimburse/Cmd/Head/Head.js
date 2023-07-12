import * as React from 'react';
import './Head.css';
import moment from 'moment';
import { VscCheck, VscCheckAll } from "react-icons/vsc";
import ReturnProfil from './Profil';
import currency from 'currency.js';
import secureLocalStorage from "react-secure-storage";
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';


let Acces = true;


function DrawerAppBar() {

 const navigation = useNavigate();
 const pushDocs = secureLocalStorage.getItem("%%docs&&col**pret")

 if (Array.isArray(pushDocs) && pushDocs.length) {
  Acces = true;
 } else {
  Acces = false;
 }

 const handlepath = (event) => {
  event.preventDefault();
  navigation(-1);
 };

 return (
  <div className='flex-head-list-reimburse'>

   <header>
    <div className='container'>
     <nav className='navbar'>

      <HiArrowLeft onClick={handlepath} size={'1.6em'} color={'white'} className={'array-static-navbar'} />
      <ReturnProfil />

     </nav>
    </div>
   </header>
   <section>

    {Acces ?
     <div className='title-pret-reimburse'>
      <>
       <h2>Vos remboursement en</h2>
       {pushDocs[0].devise ? <h2 className='color'>Dollar américain</h2> : <h2 className='color'>Franc congolais</h2>}
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