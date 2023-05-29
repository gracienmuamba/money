import React from 'react';
import './Invited.css';

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';


// view invite component
export default function ReturnInvited() {

 let list = 0;
 list = JSON.parse(window.localStorage.getItem('@@xi^^,view**++'));
 list = list.length;

 const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
   right: -3,
   top: 13,
   border: `2px solid ${theme.palette.background.paper}`,
   padding: '0 4px',
  },
 }));

 return (
  <div className='tontine-invite-user'>
   <IconButton aria-label="cart">
    <StyledBadge badgeContent={list} color="secondary">
     <img src={'/img/invited-costs.png'} />

    </StyledBadge>
   </IconButton>
  </div>

 );
};