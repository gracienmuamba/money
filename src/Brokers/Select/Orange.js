import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';


export let exportOrange = false;
export default function ControlledSwitchesOrange() {

 const [checked, setChecked] = React.useState(false);
 const handleChange = (event) => {
  setChecked(event.target.checked);
 };

 exportOrange = checked;
 window.localStorage.setItem('orange#@**__', JSON.stringify(checked));

 return (
  <FormControlLabel
   control={

    <Switch
     checked={checked}
     onChange={handleChange}
     inputProps={{ 'aria-label': 'controlled' }}
    />
   }

   label="Orange"
  />
 );
}
