import React from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';

import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

let coluserTon = JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil'));

const StyledBadge = styled(Badge)(({ theme }) => ({
 '& .MuiBadge-badge': {
  backgroundColor: '#44b700',
  color: '#44b700',
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  '&::after': {
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   borderRadius: '50%',
   animation: 'ripple 1.2s infinite ease-in-out',
   border: '1px solid currentColor',
   content: '""',
  },
 },
 '@keyframes ripple': {
  '0%': {
   transform: 'scale(.8)',
   opacity: 1,
  },
  '100%': {
   transform: 'scale(2.4)',
   opacity: 0,
  },
 },
}));

const View = (props) => {

 const [profil, setProfil] = React.useState('/img/logo.png');
 React.useEffect(async () => {
  await onSnapshot(doc(db, 'client', props.docProfil), (doc) => {
   setProfil(doc.data().profile === undefined ? '/img/logo.png' : doc.data().profile);
  });
 }, []);

 const [asked, setAsked] = React.useState(null);
 React.useEffect(async () => {
  await onSnapshot(doc(db, coluserTon, props.docAsked), (doc) => {
   setAsked(doc.data().asked);
  });
 }, []);

 return (
  <>
   <StyledBadge
    overlap="circular"
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    variant={asked > 0 ? 'dot' : ''}
   >
    <div className='profil-tontine-navs'>
     <img src={profil} />
    </div>

   </StyledBadge>
  </>
 );
};

export default View;