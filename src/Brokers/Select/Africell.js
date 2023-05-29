import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export let exportAfricell = false;

export default function ControlledSwitchesAfricell() {

 const [checked, setChecked] = React.useState(false);
 const handleChange = (event) => {
  setChecked(event.target.checked);
 };

 exportAfricell = checked;
 window.localStorage.setItem('africell#@**__', JSON.stringify(checked));

 return (
  <FormControlLabel
   control={
    <Switch
     checked={checked}
     onChange={handleChange}
     inputProps={{ 'aria-label': 'controlled' }}
    />
   }

   label="Africell"
  />
 );
}
