import React from 'react';
import './Title.css';
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
    <Skeleton variant="rectangular" width={410} height={80} />
   }

   {skelet === true && <h1>Bienvenue sur votre compte Tontine. c'est votre montant à mettre dans votre portefeuille</h1>}
  </div>
 );
};