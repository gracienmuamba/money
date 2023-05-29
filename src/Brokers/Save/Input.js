import React from 'react';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import FadeLoader from 'react-spinners/FadeLoader';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm, Controller } from 'react-hook-form';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';
import FormControl from '@mui/material/FormControl';



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



let pathVoda = false;
let pathAirtel = false;
let pathAfricell = false;
let pathOrange = false;


// Airtel Component 
export default function ReturnInpuT() {
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
          {matches.medium && <ScreenLarge />}
          {matches.large && <ScreenLarge />}
        </>
      )}
    </Media>
  );
};

export const ScreenLarge = () => (
  <div className='wrp-input-signin-user'>
    <ViewInpuT />
  </div>
);
export const ScreenSmall = () => (
  <div className='wrp-input-signin-user-sm'>
    <ViewInpuT />
  </div>
);
export const ViewInpuT = () => {

  const navigation = useNavigate();
  const { handleSubmit, control } = useForm({});

  // Network Operator
  const [voda, setVoda] = React.useState(false);
  const [airtel, setAirtel] = React.useState(false);
  const [africell, setAfricell] = React.useState(false);
  const [orange, setOrange] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');


  const inputRef = React.useRef();
  const [searchTerm, setSearchTerm] = React.useState('');

  const clearSearchString = (event) => {
    setSearchTerm('');
    inputRef.current.focus();
  }

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


  let user = window.localStorage.getItem('user^@&&');


  const handleVoda = () => {
    setVoda(false);
  };
  const handleAirtel = () => {
    setAirtel(false);
  };
  const handleAfricell = () => {
    setAfricell(false);
  };
  const handleOrange = () => {
    setOrange(false);
  };

  const onSubmit = async (data) => {

    let voda = (data.voda).match(/\d+/g);
    let numPhoneVoda = '';
    voda.map(index => {
      numPhoneVoda += index;
    });

    let airtel = (data.airtel).match(/\d+/g);
    let numPhoneAirtel = '';
    airtel.map(index => {
      numPhoneAirtel += index;
    });

    let orange = (data.orange).match(/\d+/g);
    let numPhoneOrange = '';
    orange.map(index => {
      numPhoneOrange += index;
    });


    let africell = (data.africell).match(/\d+/g);
    let numPhoneAfricell = '';
    africell.map(index => {
      numPhoneAfricell += index;
    });


    if (/^\d+$/.test(`${numPhoneVoda}`) && numPhoneVoda.length == 10 && (numPhoneVoda.includes('081') || numPhoneVoda.includes('082') || numPhoneVoda.includes('083'))) {
      pathVoda = true;
    } else {
      setVoda(true);
      pathVoda = false;
    };

    if (/^\d+$/.test(`${numPhoneAirtel}`) && numPhoneAirtel.length == 10 && (numPhoneAirtel.includes('099') || numPhoneAirtel.includes('097'))) {
      pathAirtel = true;
    } else {
      setAirtel(true);
      pathAirtel = false;
    };

    if (/^\d+$/.test(`${numPhoneOrange}`) && numPhoneOrange.length == 10 && (numPhoneOrange.includes('089') || numPhoneOrange.includes('084') || numPhoneOrange.includes('080') || numPhoneOrange.includes('085'))) {
      pathOrange = true;
    } else {
      setOrange(true);
      pathOrange = false;
    };

    if (/^\d+$/.test(`${numPhoneAfricell}`) && numPhoneAfricell.length == 10 && (numPhoneAfricell.includes('090') || numPhoneAfricell.includes('091'))) {
      pathAfricell = true;
    } else {
      setAfricell(true);
      pathAfricell = false;
    };

    if (pathVoda && pathAirtel && pathAfricell && pathOrange) {

      let userDocs = user.concat(numPhoneVoda, numPhoneAirtel, numPhoneOrange, numPhoneAfricell);

      let first = window.localStorage.getItem('userobj11first^@&&');
      let last = window.localStorage.getItem('userobj11last^@&&');
      let staf = window.localStorage.getItem('userobj11staf^@&&');

      let residence = window.localStorage.getItem('userobj11residence^@&&');
      let dwelling = window.localStorage.getItem('userobj11dwelling^@&&');
      let contact = window.localStorage.getItem('userobj11contact^@&&');

      userfiAt(first, last, staf, residence, dwelling, contact, numPhoneVoda, numPhoneAirtel, numPhoneOrange, numPhoneAfricell, userDocs);
      window.localStorage.setItem('@%^**fiatpath*>', JSON.stringify(false));

      navigation('/save/fiat/success');

    } else {
      window.console.log('not connexion');
    }

  };

  return (
    <>
      {loading && <div className='App-Icon'>
        <FadeLoader
          size={15}
          color={'#00b8d4'}
          loading={loading}
        />
      </div>}

      <form onSubmit={handleSubmit(onSubmit)}>

        <FormControl sx={{ width: '100%' }} variant="standard">

          <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Vodacom</h1></InputLabel>
          <Controller
            name="voda"
            control={control}
            render={({ field }) =>

              <Input
                value={values.textmask}
                onChange={handleChange}
                inputRef={inputRef}
                onChange={(e) => setSearchTerm(e.target.value)}

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

        <FormControl sx={{ width: '100%' }} variant="standard">

          <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Airtel</h1></InputLabel>
          <Controller
            name="airtel"
            control={control}
            render={({ field }) =>

              <Input
                value={values.textmask}
                onChange={handleChange}
                inputRef={inputRef}
                onChange={(e) => setSearchTerm(e.target.value)}

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

        <FormControl sx={{ width: '100%' }} variant="standard">

          <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Orange</h1></InputLabel>
          <Controller
            name="orange"
            control={control}
            render={({ field }) =>

              <Input
                value={values.textmask}
                onChange={handleChange}
                inputRef={inputRef}
                onChange={(e) => setSearchTerm(e.target.value)}

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

        <FormControl sx={{ width: '100%' }} variant="standard">

          <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Africell</h1></InputLabel>
          <Controller
            name="africell"
            control={control}
            render={({ field }) =>

              <Input
                value={values.textmask}
                onChange={handleChange}
                inputRef={inputRef}
                onChange={(e) => setSearchTerm(e.target.value)}

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


        <button className='Btn'>Enregistre</button>

        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={voda}
          onClose={handleVoda}>

          <DialogTitle><span className='pop-up'>MuunganoMoney</span></DialogTitle>
          <DialogContent>

            <DialogContentText>
              <p className='pop-up'>
                Veuillez vérifier le numéro de téléphone Vodacom s'il vous plaît
      </p>
            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleVoda}><span classsName='pop-up'>Fermer</span></Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={airtel}
          onClose={handleAirtel}>

          <DialogTitle><span className='pop-up'>MuunganoMoney</span></DialogTitle>
          <DialogContent>

            <DialogContentText>

              <p className='pop-up'>
                Veuillez vérifier le numéro de téléphone Airtel s'il vous plaît
      </p>

            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleAirtel}><span classsName='pop-up'>Fermer</span></Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={africell}
          onClose={handleAfricell}>

          <DialogTitle><span className='pop-up'>MuunganoMoney</span></DialogTitle>
          <DialogContent>

            <DialogContentText>
              <p className='pop-up'>
                Veuillez vérifier le numéro de téléphone Africell s'il vous plaît
      </p>
            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleAfricell}>Fermer</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={orange}
          onClose={handleOrange}>

          <DialogTitle><span className='pop-up'>MuunganoMoney</span></DialogTitle>
          <DialogContent>

            <DialogContentText>

              <p className='pop-up'>
                Veuillez vérifier le numéro de téléphone Orange s'il vous plaît
      </p>

            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleOrange}><span classsName='pop-up'>Fermer</span></Button>
          </DialogActions>
        </Dialog>

      </form>
    </>
  )
};

// Add file for fiat !
export async function userfiAt(name, last, staf, residence, dwelling, contact, voda, airtel, orange, africell, userDocsFiat) {
  // Add a new document in collection "cities"
  await setDoc(doc(db, `${JSON.parse(window.localStorage.getItem('USER'))}`, userDocsFiat), {
    firstname: name,
    lastname: last,
    staf: staf,
    residence: residence,
    dwelling: dwelling,
    contact: contact,
    voda: voda,
    airtel: airtel,
    orange: orange,
    africell: africell,
  });

};
