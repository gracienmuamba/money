import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useForm, Controller } from 'react-hook-form';

import './Search.css';
import './User.css';

import { db } from '../../../firebase';
import { collection, getDocs } from "firebase/firestore";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import { CiSearch } from 'react-icons/ci';

import ReturnIMA from './IMA';
import { TweenMax, Linear } from 'gsap';
import secureLocalStorage from "react-secure-storage";

let search = '';

export async function getSearchColumn(col) {

 let pushDoc = new Array();

 const querySnapshot = await getDocs(collection(db, `${col}`));
 querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  pushDoc.push(doc.data());
 });

 let arr = pushDoc.sort((a, b) => { return a.date - b.date })
 window.localStorage.setItem('%%docs&&col**', JSON.stringify(arr.reverse()));

};
const colors = [
 '#00b4d8', '#6a040f', '#00b4d8', '#8d99ae', '#582f0e', '#001d3d', '#386641',
 '#2c7da0', '#335c67', '#10002b', '#240046', '#495057', '#15616d', '#1b4965',
 '#5fa8d3', '#9c89b8', '#fb6f92', '#9c6644', '#7f5539', '#780000', '#007200',
 '#9e0059', '#065a60', '#312244', '#ff477e', '#b07d62', '#b07d62', '#242038',
 '#242038', '#087e8b', '#29274c', '#7e52a0', '#735d78', '#4f5d75', '#132a13'
];
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export default function CustomizedInputBase() {

 const navigation = useNavigate();
 const { control, watch } = useForm({});
 let pushDoc = new Array();
 let pushDate = new Array();
 const [arr, setArr] = React.useState([]);
 const [time, setTime] = React.useState([]);


 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, `${secureLocalStorage.getItem("USER")}`));
  querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   if (true) {
    pushDoc.push({ id: doc.id, first: doc.data().firstname, last: doc.data().lastname, date: new Date(doc.data().date).getTime() });
    pushDate.push(new Date(doc.data().date).getTime())

   }

  });

  setArr(pushDoc);
  setTime(pushDate);
  TweenMax.staggerFrom('.user-box-stock .Anima', .2, { delay: 1.5, opacity: 0, y: -20, ease: Linear.ease }, 0.08);

 }, []);

 let newArr = arr.sort(function (a, b) {

  if (a.date > b.date) return 1;
  if (a.date < b.date) return -1;
  return 0;
 });

 search = watch('search');

 const handleListItemClick = async (idfiat) => {

  getSearchColumn(idfiat.id);
  window.setTimeout(() => {
   navigation('/command/agent/list');
  }, 4500);

 };

 return (
  <div className='wrp-search-stock'>

   <Paper
    component="form"
    sx={{ p: '2px 2px', display: 'flex', alignItems: 'center', width: '100%' }}>

    <Controller
     name="search"
     control={control}
     defaultValue=''
     render={({ field }) =>

      <InputBase
       sx={{ ml: 1, flex: 1 }}
       placeholder="Rechercher Fiat"
       inputProps={{ 'aria-label': 'search', autoComplete: "off", }}
       {...field}
      />

     } />


    <IconButton type="button" sx={{ p: '5px' }} aria-label="search">
     <CiSearch size={'1.2em'} />
    </IconButton>

    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

    <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
     <ReturnIMA />
    </IconButton>

   </Paper>


   <div className='user-box-stock'>

    {[...newArr].reverse().filter((item) => {
     return search.toLowerCase() === '' ? item : item.id.includes(search.toLowerCase());

    }).map((index) => {

     let str = index.first;
     let name = str[0].toUpperCase() + str.slice(1);

     return (
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>

       <nav aria-label="main mailbox folders">
        <List key={index}>
         <ListItem disablePadding>
          <ListItemButton onClick={() => handleListItemClick(index)}>

           <div className='flex-list-user-stock Anima'>
            <ListItemIcon>
             <Avatar sx={{ bgcolor: `${colors[random(0, colors.length - 1)]}`, height: 55, width: 55 }} >
              {index.first[0].toUpperCase()}{index.last[0].toUpperCase()}
             </Avatar>
            </ListItemIcon>

            <ListItemText>
             <p>{name} {index.last.toLowerCase()}</p>
            </ListItemText>
           </div>


          </ListItemButton>
         </ListItem>

        </List>

       </nav>
      </Box>
     )
    })}

   </div>
  </div>
 );
};
