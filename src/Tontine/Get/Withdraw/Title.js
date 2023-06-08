import React from 'react';
import './Title.css';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

// Title view 
export default function ReturnTitle() {

 const [skelet, setSkelet] = React.useState(false);
 window.setTimeout(() => {
  setSkelet(true)
 }, 4540);

 return (
  <div className='title-withdraw-tontine'>
   {skelet === false &&
    <Box sx={{ width: 800 }}>
     <Skeleton />
    </Box>
   }

   {skelet === true && <h1>Bienvenue sur votre compte Tontine. c'est votre montant à mettre dans votre portefeuille</h1>}
  </div>
 );
};