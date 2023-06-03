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

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


function DrawerAppBar() {

 const navigation = useNavigate();

 let listPush = JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘˚˚'));
 let colTonPush = JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil'));

 const [currency, setCurrency] = React.useState('');
 const [load, setLoad] = React.useState(false);
 const [active, setActive] = React.useState(0);

 let index = 0;

 React.useEffect(async () => {

  [...listPush].map(async (item) => {

   await onSnapshot(doc(db, colTonPush, item), (doc) => {
    window.setTimeout(() => {
     setActive(index += Number(doc.data().soldeactive));
    }, 1150);

   });
  });

 }, []);
 React.useEffect(async () => {
  const unsub = onSnapshot(doc(db, "tontine", colTonPush), (doc) => {
   setCurrency(doc.data().currency);
  });

 }, []);


 return (
  <>
   <div className='zindex-theme'>
    <Backdrop
     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
     open={load}>

     <CircularProgress color="inherit" />
    </Backdrop>
   </div>

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

              setLoad(true);
              window.localStorage.setItem('##!!devi&&*>>', JSON.stringify(currency));
              window.localStorage.setItem('>>pos;;{}$$++==act...', JSON.stringify(active));
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
                  <ReturnIMA docProfil={listPush[index]} docAsked={listPush[index]} />
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
  </>
 );
}

export default DrawerAppBar;