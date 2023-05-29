import * as React from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';

import './Head.css';
import ReturnProfil from './Profil';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';

import ReturnIMA from './IMA';
import ReturnLasTName from './LastName';
import ReturnBudgeT from './Budget';
import { useNavigate } from 'react-router-dom';
import ReturnPrix from './Prix';


let listActive = new Array();

function DrawerAppBar() {

 const navigation = useNavigate();
 let listPush = JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘˚˚'));
 let colTonPush = JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil'));

 const [currency, setCurrency] = React.useState('');

 React.useEffect(async () => {
  [...listPush].map((item) => {

   window.setTimeout(() => {

    const unsub = onSnapshot(doc(db, colTonPush, item), (doc) => {
     listActive.push(doc.data().soldeactive);
    });

   }, 450);

  });
 }, []);

 React.useEffect(async () => {

  const unsub = onSnapshot(doc(db, "tontine", colTonPush), (doc) => {
   setCurrency(doc.data().currency);
  });

 }, []);

 window.console.log(currency);

 return (
  <div className='flex-head-list-tontine-child-all'>
   <header>
    <div className='container'>
     <nav className='navbar'>
      <ReturnProfil />
     </nav>
    </div>
   </header>

   <section>
    <ReturnBudgeT />
    {
     <ul>
      {
       [...Array(listPush.length).keys()].map(index => {
        return (
         <div
          onClick={
           () => {
            if (listPush[index] === JSON.parse(window.localStorage.getItem('USER'))) {

             window.localStorage.setItem('^^$%list++::act::', JSON.stringify(listActive.includes(false) ? true : false));
             window.localStorage.setItem('##!!devi&&*>>', JSON.stringify(currency));
             window.localStorage.setItem('##!!devi --phone&&*>>', JSON.stringify(listPush[index]));

             window.setTimeout(() => {
              navigation('/tontine/list/group/child/budget');
             }, 450);

            } else {
             window.console.log(false);
            }

           }}>
          <List>
           <ListItem disablePadding>
            <ListItemButton>

             <li key={index}>
              <div className='cmd-operator-title'>
               <div className='cmd-operator-sub-title'>

                <div className='flex-row-cmd'>
                 <ReturnIMA docProfil={listPush[index]} />
                 <ReturnLasTName docName={listPush[index]} />

                </div>

               </div>
              </div>

              <ReturnPrix docTonUser={listPush[index]} />
             </li>


            </ListItemButton>
           </ListItem>
          </List>
          <Divider />
         </div>
        )
       })}
     </ul>
    }

   </section>

  </div>
 );
}

export default DrawerAppBar;