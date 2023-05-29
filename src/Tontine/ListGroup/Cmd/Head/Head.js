import * as React from 'react';
import './Head.css';
import ReturnProfil from './Profil';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';

import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../../firebase';


let Acces = true;
let listPush = new Array();
let listRising = new Array();

function DrawerAppBar() {

 const pushDocs = JSON.parse(window.localStorage.getItem('&&view$$list£¢ton…'));
 const pushOther = JSON.parse(window.localStorage.getItem('&&view$$list£¢toncol§§-…'));

 React.useEffect(async () => {

  [...pushOther].map((item) => {

   const unsub = onSnapshot(doc(db, "tontine", item), (doc) => {
    window.setTimeout(() => {
     listRising.push(doc.data().rising);
    }, 500);

   });

  })

  window.console.log(listRising);

 }, []);

 if (Array.isArray(pushDocs) && pushDocs.length) {
  Acces = true;
 } else {
  Acces = false;
 };

 return (
  <div className='flex-head-list-tontine'>

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
        [...Array(pushDocs.length).keys()].map(index => {
         return (

          <div onClick={async () => {

           window.localStorage.setItem('¥¥˙´¸list˘˘22˚˚fil', JSON.stringify(pushOther[index]));
           const querySnapshot = await getDocs(collection(db, pushOther[index]));
           querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            listPush.push(doc.id);
           });

           window.localStorage.setItem('¥¥˙´¸list˘˘˚˚', JSON.stringify(listPush));
           window.setTimeout(() => {
            window.location.href = "/tontine/list/group/child";
           }, 800);

          }}>

           <List>
            <ListItem disablePadding>
             <ListItemButton>

              <li key={index}>
               <div className='cmd-operator-title'>
                <div className='cmd-operator-sub-title'>

                 <div className='flex-row-cmd'>
                  <p>{pushDocs[index].charAt(0).toUpperCase() + pushDocs[index].slice(1)}</p>
                 </div>
                </div>

               </div>

              </li>

             </ListItemButton>
            </ListItem>
           </List>
           <Divider />
          </div>
         )
        })}
      </ul>
      : <div></div>
    }
   </section>
  </div >
 );
}

export default DrawerAppBar;