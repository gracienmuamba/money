import React from 'react';
import './Select.css';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';


const currencies = [
 {
  value: 'USD',
  label: 'USD',
 },
 {
  value: 'CDF',
  label: 'CDF',
 }
];


// Return Select Component 
export default function ReturnSelect() {

 const navigation = useNavigate();
 const { handleSubmit, control, watch } = useForm({});

 const onSubmit = async (data) => {
  window.console.log(data.devise);
  navigation('/stock/buy');
  window.localStorage.setItem(JSON.stringify('^^#devise**&&'), data.devise);
 };


 return (
  <div className='stock-select'>
   <form onSubmit={handleSubmit(onSubmit)}>
    <Controller
     name="devise"
     defaultValue="USD"
     control={control}
     render={({ field }) =>

      <FormControl fullWidth
       sx={{ fontSize: '5em', width: '2em' }}>

       <TextField
        id="standard-select-currency"
        select
        label="Devise"
        {...field}
        defaultValue="CDF"
        variant="standard">

        {currencies.map((option) => (
         <MenuItem key={option.value} value={option.value}>
          {option.label}
         </MenuItem>
        ))}

       </TextField>


      </FormControl>
     } />

    <button className='Btn'>Suivant</button>
   </form>
  </div>
 );
};