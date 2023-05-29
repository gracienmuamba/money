import React from 'react';
import './Invited.css';
import { db } from '../../firebase';
import { doc, getDocFromCache } from "firebase/firestore";

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

// view invite component
export default function ReturnInvited() {

 const [list, setList] = React.useState([0]);
 const [aswer, setAswer] = React.useState(false);

 const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
   right: 20,
   top: 20,
   border: `2px solid ${theme.palette.background.paper}`,
   padding: '0 4px',
  },
 }));

 React.useEffect(async () => {

  const docRef = doc(db, "client", JSON.parse(window.localStorage.getItem('USER')));
  // Get a document, forcing the SDK to fetch from the offline cache.
  try {
   const doc = await getDocFromCache(docRef);
   // Document was found in the cache. If no cached document exists,
   setList(doc.data().grouptontine);
  } catch (e) {
   setAswer(true);
   console.log("Error getting cached document:", e);
  };

 }, []);

 let size = 0;

 if (aswer) {
  size = 0
 } else {

  if (list === undefined) {
   size = 0
  } else {
   size = list.length;

  }

 }

 return (
  <div className='tontine-send-invited'>
   <IconButton aria-label="cart">
    <StyledBadge badgeContent={size} color="secondary">
     <img src={'/img/invitation.png'} />
    </StyledBadge>
   </IconButton>
  </div>
 );
};