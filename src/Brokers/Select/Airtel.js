import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export let exportAirtel = false;

export default function ControlledSwitchesAirtel() {

 const [checked, setChecked] = React.useState(false);
 const handleChange = (event) => {
  setChecked(event.target.checked);
 };

 exportAirtel = checked;
 window.localStorage.setItem('airtel#@**__', JSON.stringify(checked));

 return (
  <FormControlLabel
   control={

    <Switch
     checked={checked}
     onChange={handleChange}
     inputProps={{ 'aria-label': 'controlled' }}
    />
   }

   label="Airtel"
  />
 );
}
