import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export let exportVodA = false;

export default function ControlledSwitchesVoda() {

 const [checked, setChecked] = React.useState(false);
 const handleChange = (event) => {
  setChecked(event.target.checked);
 };

 exportVodA = checked;
 window.localStorage.setItem('voda#@**__', JSON.stringify(checked));

 return (
  <FormControlLabel
   control={
    <Switch
     checked={checked}
     onChange={handleChange}
     inputProps={{ 'aria-label': 'controlled' }}
    />
   }

   label="Vodacom"
  />
 );
}
