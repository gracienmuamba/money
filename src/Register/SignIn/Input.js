import React from 'react';
import './Input.css';
import Media from 'react-media';
import { useForm, Controller } from 'react-hook-form';
import { doc, setDoc, updateDoc, increment, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import MomentUtils from "@date-io/moment";
import moment from 'moment';
import "moment/locale/fr";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

// import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';


export let nowField = moment().date();
export let pushDocs = new Array();


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

  let regular = /[a-z]+/;
  const [locale, setLocale] = React.useState("fr");
  const [tablepartner, setTablepartner] = React.useState();
  const [selectedDate, handleDateChange] = React.useState(new Date());
  const [load, setLoad] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [depot, setDepot] = React.useState(false);
  const [disable, setDisable] = React.useState(false);

  const [phone, setPhone] = React.useState(false);
  const [fran, setFran] = React.useState(0);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  // const navigation = useNavigate();

  const existing = { active: true, credit: [], state: "client", cdf: 5000, usd: 0, thriftcdf: 0, thriftusd: 0, pretexten: '', sendtype: '', accountdate: moment().format(), pret: false, pretregister: false, pretactive: false, delay: '', code: '000000', pin: 'ungano', phoneclient: '', unite: '', solde: 0, money: 0, frais: 0, user: '', swap: [], extension: 'extension', profile: 'https://firebasestorage.googleapis.com/v0/b/ungamamoney-wallet.appspot.com/o/image%2Flogo.png?alt=media&token=a1b84070-76b5-43c7-a3e1-199e353c0711' }
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

  const handleClose = () => {
    setOpen(false);
  };
  const phoneClose = () => {
    setPhone(false);
  };
  const depotClose = () => {
    setDepot(false);
  };

  React.useEffect(async () => {

    try {
      await onSnapshot(doc(db, "muungano", "partner"), (doc) => {
        setTablepartner(doc.data().client);
      });

    } catch {
      window.console.log('erreur disponible');
    }

    try {
      await onSnapshot(doc(db, "agent", JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
        setFran(doc.data().cdf);
      });
    } catch {
      window.console.log('erreur disponible');
    }

  }, []);

  // Ref collection database!
  const onSubmit = async (data) => {

    if (data.phone === undefined) {
      setPhone(true);
      setLoad(false);

    } else {

      setLoad(true);

      let num = (data.phone).match(/\d+/g);
      let numPhone = '';
      num.map(index => {
        numPhone += index;

      })

      if (numPhone.length != 10) {
        setPhone(true);
        setLoad(false);

      } else {

        if (fran >= 7000) {

          let valuePartner = Number(tablepartner[nowField]) + 1;
          let arrayPartner = tablepartner;

          for (let i = nowField; i <= 31; i++) {
            arrayPartner[i] = valuePartner;
          }

          let dateBirth = data.birth;
          if (dateBirth) {
            Object.defineProperty(data, 'birth', {
              value: dateBirth.format('LL'),
              writable: true,
              configuration: true,
              enumerable: true

            })

            let mail = '';

            if (data.email === undefined || data.email === '') {
              mail = '';
            } else {
              mail = data.email;

            }

            let objInput = {

              addresse: data.addresse,
              birth: data.birth,
              email: mail,
              firstname: data.firstname,
              lastname: data.lastname,
              phone: numPhone,
              ville: data.ville,

            }

            if (JSON.parse(window.localStorage.getItem('--#%¢res¸˘˘'))) {

              const clone = Object.assign(objInput, existing);
              saveInfoInWithDocs(JSON.parse(window.localStorage.getItem('--#%¢res¸˘˘')), clone);
              incrementPartner(arrayPartner, 5000);
              window.localStorage.setItem('--client#%¢res¸˘˘', JSON.stringify(false));

              window.setTimeout(() => {
                window.location.href = "/register/success";
              }, 5000);

            }

          } else {
            setLoad(false);
            setOpen(true);
          }
        } else {

          setLoad(false);
          setDepot(true);
        }

      }

    }

  };

  return (
    <>
      <div className='zindex-theme'>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={load}>

          <CircularProgress color="inherit" />
        </Backdrop>
      </div>

      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>

        <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Nom</h1></InputLabel>

          <Controller
            name="firstname"
            control={control}
            render={({ field }) =>

              <Input
                autoFocus
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
          <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Email</h1></InputLabel>

          <Controller
            name="email"
            control={control}
            render={({ field }) =>

              <Input
                inputProps={{ autoComplete: "off" }}
                name="email"
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

        <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Ville</h1></InputLabel>

          <Controller
            name="ville"
            control={control}
            render={({ field }) =>

              <Input
                inputProps={{ autoComplete: "off" }}
                name="ville"
                {...field}
              />

            }
          />
        </FormControl>

        <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel htmlFor="formatted-text-mask-input"><h1 className='pop-up'>Addresse</h1></InputLabel>

          <Controller
            name="addresse"
            control={control}
            render={({ field }) =>

              <Input
                inputProps={{ autoComplete: "off" }}
                name="addresse"
                {...field}
              />

            }
          />
        </FormControl>


        <Controller
          name="birth"
          control={control}
          render={({ field }) =>

            <MuiPickersUtilsProvider
              libInstance={moment} utils={MomentUtils} locale={locale}>

              <DatePicker
                disableFuture
                openTo="year"
                format="dd/MM/yyyy"
                label="Date de naissance"
                views={["year", "month", "date"]}
                value={selectedDate}
                onChange={handleDateChange}
                {...field}
              />

            </MuiPickersUtilsProvider>}
        />

        <button className='Btn'>Enregistre</button>

        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle><span className='pop-up'>MuunganoMoney</span></DialogTitle>
          <DialogContent>

            <DialogContentText>
              <p className='pop-up'>
                Veuillez confirmer la date de naissance
            </p>
            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}><span className='pop-up'>Fermer</span></Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={phone}
          onClose={phoneClose}
        >
          <DialogTitle><span className='pop-up'>MuunganoMoney</span></DialogTitle>
          <DialogContent>

            <DialogContentText>
              <p className='pop-up'>
                Ce numéro de téléphone est incorrect, veuillez vérifier ce numéro d'appel.
      </p>
            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={phoneClose}><span className='pop-up'>Fermer</span></Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={depot}
          onClose={depotClose}
        >
          <DialogTitle><span className='pop-up'>MuunganoMoney</span></DialogTitle>
          <DialogContent>

            <DialogContentText>
              <p className='pop-up'>
                Le solde actuel n'est pas suffisant pour finaliser cette inscription
      </p>
            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={depotClose}><span className='pop-up'>Fermer</span></Button>
          </DialogActions>
        </Dialog>

      </form>

    </>
  )
};


async function saveInfoInWithDocs(phoneInDocs, user) {
  await setDoc(doc(db, "client", phoneInDocs), user);
};
async function incrementPartner(arrayPartner, value) {

  const washingtonRef = doc(db, "muungano", "partner");
  await updateDoc(washingtonRef, {
    client: arrayPartner,
  });

  const partnerRef = doc(db, "muunganomoney", "partner");
  await updateDoc(partnerRef, {
    client: increment(1),
  });

  const moneyRef = doc(db, "muunganomoney", "money");
  await updateDoc(moneyRef, {
    register: increment(1000),
  });

  const agentRef = doc(db, "agent", `${JSON.parse(window.localStorage.getItem('USER'))}`);
  await updateDoc(agentRef, {
    cdf: increment(-value),
    thriftcdf: increment(1000)
  });

};
