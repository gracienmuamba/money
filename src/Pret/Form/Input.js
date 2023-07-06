import React from 'react';
import Media from 'react-media';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, updateDoc, onSnapshot, getDocs, collection } from 'firebase/firestore';
import moment from 'moment';
import "moment/locale/fr";

import './Pieces.css';
import { db, storage } from '../../firebase';
import { ref, uploadBytes, deleteObject, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
import IconButton from '@mui/material/IconButton';

import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';
import TextField from '@mui/material/TextField';
import secureLocalStorage from "react-secure-storage";



export let nowField = moment().date();
export let pushDocs = new Array();
let pushPieces = new Array();


function CircularProgressWithLabel(props) {
 return (
  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
   <CircularProgress variant="determinate" {...props} />
   <Box
    sx={{
     top: 0,
     left: 0,
     bottom: 0,
     right: 0,
     position: 'absolute',
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
    }}
   >
    <Typography variant="caption" component="div" color="text.secondary">
     {`${Math.round(props.value)}%`}
    </Typography>
   </Box>
  </Box>
 );
}
CircularProgressWithLabel.propTypes = {
 /**
  * The value of the progress indicator for the determinate variant.
  * Value between 0 and 100.
  * @default 0
  */
 value: PropTypes.number.isRequired,
};
const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
 const { onChange, ...other } = props;
 return (
  <IMaskInput
   {...other}
   mask="(#00) 000-0000"
   definitions={{
    '#': /[1-9]/,
   }}
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
  <div className='wrp-input-pieces'>
   <FormInput />
  </div>
 )
}
export const ScreenSmall = () => {
 return (
  <div className='wrp-input-pieces'>
   <FormInput />
  </div>
 )
};

export const FormInput = () => {

 const [imageUpload, setImageUpload] = React.useState(null);
 const [url, setUrl] = React.useState(null);
 const [profil, setProfil] = React.useState(null);
 const [progress, setProgress] = React.useState(0);
 const [viewBtn, setViewBtn] = React.useState(false);
 const [exten, setExten] = React.useState(null);

 const [loading, setLoading] = React.useState(false);
 const [success, setSuccess] = React.useState(false);
 const timer = React.useRef();

 const buttonSx = {
  ...(success && {
   bgcolor: green[500],
   '&:hover': {
    bgcolor: green[700],
   },
  }),
 };

 const [values, setValues] = React.useState({
  textmask: '(100) 000-0000',
  numberformat: '1320',
 });


 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   pushPieces.push(doc.id);
  });

  const unsub = onSnapshot(doc(db, "client", secureLocalStorage.getItem("USER")), (doc) => {
   setProfil(doc.data().pretprofile);
   setExten(doc.data().pretexten);
  });

  return () => {
   clearTimeout(timer.current);
  };

 }, []);
 const handleButtonClick = () => {
  if (!loading) {
   setSuccess(false);
   setLoading(true);
   timer.current = window.setTimeout(() => {
    setSuccess(true);
    setLoading(false);
   }, 2000);
  }
 };
 const uploadImage = async () => {

  if (imageUpload == null)
   return;

  const imgRef = imageUpload.name + v4();
  const imageRef = ref(storage, `pret/${imgRef}`);


  uploadBytes(imageRef, imageUpload).then(() => {
   getDownloadURL(imageRef, imageUpload).then((url) => {

    const uploadTask = uploadBytesResumable(imageRef, imageUpload)
    uploadTask.on('state_changed', (snapshot) => {
     const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
     setProgress(prog);
    },
     (err) => window.console.log(err), () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url))
     })

    setUrl(url);
    const collect = pushPieces.includes(secureLocalStorage.getItem("USER"));
    const washingtonRef = doc(db, collect ? "client" : "agent", secureLocalStorage.getItem("USER"));
    // Set the "capital" field of the city 'DC'
    updateDoc(washingtonRef, {
     pretprofile: url,
     pretexten: imgRef
    });

   }).catch(error => { window.console.log(error.message) })
   setImageUpload(null);

  }).catch(error => { window.console.log(error.message) });
  setViewBtn(false);

  window.console.log(imgRef);
  if (exten != '') {
   // Create a reference to the file to delete
   const desertRef = ref(storage, `pret/${exten}`);
   // Delete the file
   deleteObject(desertRef).then(() => {
    // File deleted successfully
    window.console.log('Success remove image');

   }).catch((error) => {
    window.console.log('Error Reomve');
    // Uh-oh, an error occurred!
   });
  }

 }

 const [open, setOpen] = React.useState(false);
 const [fullWidth, setFullWidth] = React.useState(true);
 const [maxWidth, setMaxWidth] = React.useState('sm');

 const navigation = useNavigate();
 const { register, handleSubmit, control } = useForm({});

 const handleClose = () => {
  setOpen(false);
 };
 const handleChange = (event) => {
  setValues({
   ...values,
   [event.target.name]: event.target.value,
  });
 };


 // Ref collection database!
 const onSubmit = async (data) => {

  secureLocalStorage.setItem("@!pret&*access*^^", false);
  secureLocalStorage.setItem("^^&&register__pret", false);

  let money = {

   usd: Number(data.digit),
   cdf: 0,
   pretusd: Number(data.digit),
   pretcdf: 0,
   date: moment().format(),
   arr: []

  };
  const clone = {
   ...money,
   ...data

  }

  documentPret(clone);
  updateRegister();
  percentageClient();

  window.setTimeout(() => {
   navigation('/pret/send');
  }, 500);

 };

 return (
  <form autocomplete="off" onSubmit={handleSubmit(onSubmit)}>

   <FormControl sx={{ width: '100%' }} variant="standard">
    <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Nom</h1></InputLabel>

    <Controller
     name="name"
     control={control}
     render={({ field }) =>

      <Input
       inputProps={{ autoComplete: "off" }}
       name="name"
       {...field}
      />

     }
    />
   </FormControl>
   <FormControl sx={{ width: '100%' }} variant="standard">
    <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Adresse domiciliaire actuelle</h1></InputLabel>

    <Controller
     name="address"
     control={control}
     render={({ field }) =>

      <Input
       inputProps={{ autoComplete: "off" }}
       name="address"
       {...field}
      />

     }
    />
   </FormControl>
   <FormControl sx={{ width: '100%' }} variant="standard">
    <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Spécifiez le projet</h1></InputLabel>

    <Controller
     name="specify"
     control={control}
     render={({ field }) =>

      <Input
       inputProps={{ autoComplete: "off" }}
       name="specify"
       {...field}
      />

     }
    />
   </FormControl>


   <Controller
    name="costs"
    defaultValue=''
    control={control}
    render={({ field }) =>

     <TextField
      label={<h2 className='pop-up'>Le cout de mon Projet est estimé à USD</h2>}
      value={values.numberformat}
      onChange={handleChange}

      inputProps={{
       autoComplete: "off", inputMode: 'decimal'
      }}

      {...field}
      name="costs"
      placeholder="0"
      id="formatted-numberformat-input"
      InputProps={{
       inputComponent: NumericFormatCustom,
      }}

      variant="standard"
     />

    }
   />
   <Controller
    name="revenu"
    defaultValue=''
    control={control}
    render={({ field }) =>

     <TextField
      label={<h2 className='pop-up'>Mon revenu mensuel estimé à USD</h2>}
      value={values.numberformat}
      onChange={handleChange}

      inputProps={{
       autoComplete: "off", inputMode: 'decimal'
      }}

      {...field}
      name="revenu"
      placeholder="0"
      id="formatted-numberformat-input"
      InputProps={{
       inputComponent: NumericFormatCustom,
      }}

      variant="standard"
     />

    }
   />

   <Controller
    name="apport"
    defaultValue=''
    control={control}
    render={({ field }) =>

     <TextField
      label={<h2 className='pop-up'>Un Apport estimé à USD</h2>}
      value={values.numberformat}
      onChange={handleChange}

      inputProps={{
       autoComplete: "off", inputMode: 'decimal'
      }}

      {...field}
      name="apport"
      placeholder="0"
      id="formatted-numberformat-input"
      InputProps={{
       inputComponent: NumericFormatCustom,
      }}

      variant="standard"
     />

    }
   />

   <FormControl sx={{ width: '100%' }} variant="standard">
    <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Montant demander en lettre</h1></InputLabel>

    <Controller
     name="letter"
     control={control}
     render={({ field }) =>

      <Input
       inputProps={{ autoComplete: "off" }}
       name="letter"
       {...field}
      />

     }
    />
   </FormControl>

   <Controller
    name="digit"
    defaultValue=''
    control={control}
    render={({ field }) =>

     <TextField
      label={<h2 className='pop-up'>Montant demander en chiffre</h2>}
      value={values.numberformat}
      onChange={handleChange}

      inputProps={{
       autoComplete: "off", inputMode: 'decimal'
      }}

      {...field}
      name="digit"
      placeholder="0"
      id="formatted-numberformat-input"
      InputProps={{
       inputComponent: NumericFormatCustom,
      }}

      variant="standard"
     />

    }
   />


   <div className='import-pieces'>
    <p>Importer pièces justificatives</p>

    <div className='wrp-pieces-avatar-user'>

     <IconButton color="primary" aria-label="upload picture" component="label">
      <div className='profile-user'>

       <img src={'/img/uploadpret.png'} alt={'upload file'} />
       <input
        hidden
        type="file"
        onChange={(event) => {
         setImageUpload(event.target.files[0]);
         setViewBtn(true);
        }}
       />
      </div>
     </IconButton>

     <CircularProgressWithLabel value={progress} />
     {viewBtn &&
      <div onClick={uploadImage}>
       <Box sx={{ display: 'flex', alignItems: 'center' }}>

        <Box sx={{ position: 'relative' }}>

         <Fab

          aria-label="save"
          color="primary"
          sx={buttonSx}
          onClick={handleButtonClick}
         >
          {success ? <CheckIcon /> : <SaveIcon />}
         </Fab>

         {loading && (
          <CircularProgress
           size={45}
           sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
           }}
          />
         )}
        </Box>

       </Box>

      </div>
     }


    </div>
   </div>

   {progress > 95 &&
    <button className='Btn'>Envoyer Formulaire</button>
   }

  </form>
 )
};

// Add Document Pret
export async function documentPret(data) {
 await setDoc(doc(db, "pret", secureLocalStorage.getItem("USER")), data);
};
// Update docs register
export async function updateRegister() {

 const washingtonRef = doc(db, "client", secureLocalStorage.getItem("USER"));
 // Set the "capital" field of the city 'DC'
 await updateDoc(washingtonRef, {
  pretregister: true
 });

}
// Update docs register
export async function percentageClient() {

 const cityRef = doc(db, 'client', secureLocalStorage.getItem("USER"));
 setDoc(cityRef, { percentage: 0.6 }, { merge: true });

};


