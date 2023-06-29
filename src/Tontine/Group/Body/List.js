import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import './List.css';

import { useNavigate } from 'react-router-dom';


export default function BasicList() {

 const navigation = useNavigate();
 let list = JSON.parse(window.localStorage.getItem('&&$$list¶-¨'));

 const handlepath = (event) => {
  event.preventDefault();
  navigation('/tontine/group/register');
 };

 return (
  <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>

   <h2 className='list-group-item-bd-title'>Groupe Tontine</h2>
   <nav aria-label="main mailbox folders">
    {[...list].map((index) => {

     const capitalized = index.charAt(0).toUpperCase() + index.slice(1)

     return (
      <List onClick={handlepath}>
       <ListItem disablePadding>
        <ListItemButton>


         <ListItemText >
          <span className='list-group-item-bd-tontine'>{capitalized}</span>
         </ListItemText>

        </ListItemButton>
       </ListItem>
       <Divider />
      </List>
     )

    })}
   </nav>
  </Box>
 );
};
