// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Media from 'react-media';
// import { useForm, Controller } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';

// import Input from '@mui/material/Input';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';

// import PropTypes from 'prop-types';
// import { IMaskInput } from 'react-imask';
// import { NumericFormat } from 'react-number-format';

// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContentText from '@mui/material/DialogContentText';


// const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
//  const { onChange, ...other } = props;
//  return (
//   <IMaskInput
//    {...other}
//    mask="(#00) 000-0000"
//    definitions={{
//     '#': /[0-9]/,
//    }}
//    inputmode="tel"
//    pattern="[0-9]*"

//    inputRef={ref}
//    onAccept={(value) => onChange({ target: { name: props.name, value } })}
//    overwrite
//   />
//  );
// });
// TextMaskCustom.propTypes = {
//  name: PropTypes.string.isRequired,
//  onChange: PropTypes.func.isRequired,
// };
// const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
//  props,
//  ref,
// ) {
//  const { onChange, ...other } = props;

//  return (
//   <NumericFormat
//    {...other}
//    getInputRef={ref}
//    onValueChange={(values) => {
//     onChange({
//      target: {
//       name: props.name,
//       value: values.value,
//      },
//     });
//    }}
//    thousandSeparator
//    inputmode="tel"
//    valueIsNumericString
//    prefix=""
//   />
//  );
// });
// NumericFormatCustom.propTypes = {
//  name: PropTypes.string.isRequired,
//  onChange: PropTypes.func.isRequired,
// };


// // Input Field Component 
// export default function ReturnInput() {
//  return (
//   <Media
//    queries={{
//     small: '(max-width: 599px)',
//     medium: '(min-width: 600px) and (max-width:1199px)',
//     large: '(min-width: 1200px)',
//    }}>
//    {matches => (
//     <>
//      {matches.small && <ScreenSmall />}
//      {matches.medium && <SreenLarge />}
//      {matches.large && <SreenLarge />}
//     </>
//    )}
//   </Media>
//  );
// };

// export const SreenLarge = () => {
//  return (
//   <div className='wrp-input-signin-user'>
//    <FormInput />
//   </div>
//  )
// }
// export const ScreenSmall = () => {
//  return (
//   <div className='wrp-input-signin-user-sm'>
//    <FormInput />
//   </div>
//  )
// };
// export const FormInput = () => {

//  const navigation = useNavigate();
//  const { register, handleSubmit, control } = useForm({});

//  const [open, setOpen] = React.useState(false);
//  const [fullWidth, setFullWidth] = React.useState(true);
//  const [maxWidth, setMaxWidth] = React.useState('sm');


//  const [values, setValues] = React.useState({
//   textmask: '(100) 000-0000',
//   numberformat: '1320',
//  });
//  const handleChange = (event) => {
//   setValues({
//    ...values,
//    [event.target.name]: event.target.value,
//   });
//  };

//  const handleClose = () => {
//   setOpen(false);
//  };

//  // Ref collection database!
//  const onSubmit = async (data) => {

//   if (data.name === undefined || data.name === '') {
//    setOpen(true);
//    window.console.log('Erroe');
//   } else {
//    window.console.log(data);

//   }

//  };

//  return (
//   <form onSubmit={handleSubmit(onSubmit)} autocomplete="off">

//    <FormControl sx={{ width: '100%' }} variant="standard">
//     <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Nom</h1></InputLabel>

//     <Controller
//      name="name"
//      control={control}
//      render={({ field }) =>

//       <Input
//        inputProps={{ autoComplete: "off" }}
//        name="name"
//        {...field}
//       />

//      }
//     />
//    </FormControl>

//    <Dialog
//     fullWidth={fullWidth}
//     maxWidth={maxWidth}
//     open={open}
//     onClose={handleClose}>

//     <DialogTitle><h1 className='pop-up'>MuunganoMoney</h1></DialogTitle>
//     <DialogContent>

//      <DialogContentText>
//       <p className='pop-up'>
//        Valider le nom de la tontine
//      </p>
//      </DialogContentText>

//     </DialogContent>
//     <DialogActions>
//      <Button onClick={handleClose}><span className='pop-up'>Fermer</span></Button>
//     </DialogActions>
//    </Dialog>

//    <button className='Btn'>Avancer</button>
//   </form>
//  )
// };
