import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Media from 'react-media';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';


const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
 const { onChange, ...other } = props;
 return (
  <IMaskInput
   {...other}
   mask="(#00) 000-0000"
   definitions={{
    '#': /[0-9]/,
   }}
   inputmode="tel"
   pattern="[0-9]*"

   inputRef={ref}
   onAccept={(value) => onChange({ target: { name: props.name, value } })}
   overwrite
  />
 );
});
TextMaskCustom.propTypes = {
 name: PropTypes.string.isRequired,
 onChange: PropTypes.func.isRequired,
};
const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
 props,
 ref,
) {
 const { onChange, ...other } = props;

 return (
  <NumericFormat
   {...other}
   getInputRef={ref}
   onValueChange={(values) => {
    onChange({
     target: {
      name: props.name,
      value: values.value,
     },
    });
   }}
   thousandSeparator
   inputmode="tel"
   valueIsNumericString
   prefix=""
  />
 );
});
NumericFormatCustom.propTypes = {
 name: PropTypes.string.isRequired,
 onChange: PropTypes.func.isRequired,
};


// Input Field Component 
export default function ReturnInput() {
 return (
  <Media
   queries={{
    small: '(max-width: 599px)',
    medium: '(min-width: 600px) and (max-width:1199px)',
    large: '(min-width: 1200px)',
   }}>
   {matches => (
    <>
     {matches.small && <ScreenSmall />}
     {matches.medium && <SreenLarge />}
     {matches.large && <SreenLarge />}
    </>
   )}
  </Media>
 );
};

export const SreenLarge = () => {
 return (
  <div className='wrp-input-signin-user'>
   <FormInput />
  </div>
 )
}
export const ScreenSmall = () => {
 return (
  <div className='wrp-input-signin-user-sm'>
   <FormInput />
  </div>
 )
};
export const FormInput = () => {

 const navigation = useNavigate();
 const { register, handleSubmit, control } = useForm({});

 const [values, setValues] = React.useState({
  textmask: '(100) 000-0000',
  numberformat: '1320',
 });
 const handleChange = (event) => {
  setValues({
   ...values,
   [event.target.name]: event.target.value,
  });
 };

 // Ref collection database!
 const onSubmit = async (data) => {

  if (data.phone === undefined) {
   window.console.log('Erroe');

  } else {

   let num = (data.phone).match(/\d+/g);
   let numPhone = '';
   num.map(index => {
    numPhone += index;
   });


   let first = data.firstname.toLowerCase();
   let last = data.lastname.toLowerCase();
   let staf = data.staf.toLowerCase();
   let residence = data.residence.toLowerCase();
   let dwelling = data.dwelling.toLowerCase();

   let user = first.concat(last, staf);

   window.localStorage.setItem('user^@&&', user);

   window.localStorage.setItem('userobj11first^@&&', first);
   window.localStorage.setItem('userobj11last^@&&', last);
   window.localStorage.setItem('userobj11staf^@&&', staf);

   window.localStorage.setItem('userobj11residence^@&&', residence);
   window.localStorage.setItem('userobj11dwelling^@&&', dwelling);
   window.localStorage.setItem('userobj11contact^@&&', numPhone);

   window.localStorage.setItem('@%^**fiatpath*>', JSON.stringify(true));
   navigation('/brokers/save');

  }

 };

 return (
  <form style={{ marginTop: '3vh' }} onSubmit={handleSubmit(onSubmit)} autocomplete="off">

   <FormControl sx={{ width: '100%' }} variant="standard">
    <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Nom</h1></InputLabel>

    <Controller
     name="firstname"
     control={control}
     render={({ field }) =>

      <Input
       inputProps={{ autoComplete: "off" }}
       name="firstname"
       {...field}
      />

     }
    />
   </FormControl>

   <FormControl sx={{ width: '100%' }} variant="standard">
    <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Prènom</h1></InputLabel>

    <Controller
     name="lastname"
     control={control}
     render={({ field }) =>

      <Input
       inputProps={{ autoComplete: "off" }}
       name="lastname"
       {...field}
      />

     }
    />
   </FormControl>

   <FormControl sx={{ width: '100%' }} variant="standard">
    <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Staf</h1></InputLabel>

    <Controller
     name="staf"
     control={control}
     render={({ field }) =>

      <Input
       inputProps={{ autoComplete: "off" }}
       name="staf"
       {...field}
      />

     }
    />
   </FormControl>

   <FormControl sx={{ width: '100%' }} variant="standard">
    <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Résidence actuelle</h1></InputLabel>

    <Controller
     name="residence"
     control={control}
     render={({ field }) =>

      <Input
       inputProps={{ autoComplete: "off" }}
       name="residence"
       {...field}
      />

     }
    />
   </FormControl>

   <FormControl sx={{ width: '100%' }} variant="standard">
    <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Résidence du staf</h1></InputLabel>

    <Controller
     name="dwelling"
     control={control}
     render={({ field }) =>

      <Input
       inputProps={{ autoComplete: "off" }}
       name="dwelling"
       {...field}
      />

     }
    />
   </FormControl>

   <FormControl sx={{ width: '100%' }} variant="standard">
    <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Numero de contact</h1></InputLabel>

    <Controller
     name="phone"
     control={control}
     render={({ field }) =>

      <Input
       value={values.textmask}
       onChange={handleChange}
       inputProps={{
        autoComplete: "off", inputMode: 'tel'
       }}
       name="textmask"
       id="formatted-text-mask-input"
       inputComponent={TextMaskCustom}
       {...field}
      />

     }
    />
   </FormControl>


   <button className='Btn'>Suivant</button>
  </form>
 )
};
