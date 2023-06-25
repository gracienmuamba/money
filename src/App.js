import React from 'react';
import './Loading.css';
import Hm from './Hm/Main';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

function App() {
 const [open, setOpen] = React.useState(JSON.parse(window.localStorage.getItem('Ex47jorXU49V+GVNt7jmtI33vaG9N8d+ckoZd0f4set0XiaOM5WuKL8yB5dDUSgh8gbloNcH+CzP5tGMRNBi3YgLK7Zc')));
 return (
  <>
   <Box sx={{ width: '100%' }}>
    <Collapse in={open}>

     <Alert
      action={
       <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={() => {
         setOpen(false);
        }}
       >
        <CloseIcon fontSize="inherit" />
       </IconButton>
      }
     >

      <p className='pop-up'>
       Vous pouvez vous connecter avec cet appareil !!!
      </p>

     </Alert>
    </Collapse>

   </Box>

   <Hm />
  </>
 );
};

// Export component Main
export default App