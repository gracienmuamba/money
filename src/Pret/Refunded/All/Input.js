import React from 'react';
import Media from 'react-media';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { doc, onSnapshot, updateDoc, increment, arrayUnion, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import moment from 'moment';
import secureLocalStorage from "react-secure-storage";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


// View Form Update view
export default function ReturnFormUpdate() {
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


let pushDocs = new Array();


export const ScreenLarge = () => (
	<div className='wrp-form-input-nows'>
		<FormInputField />
	</div>
);
export const ScreenSmall = () => (
	<div className='wrp-form-input-nows'>
		<FormInputField />
	</div>
);

export const FormInputField = () => {

	let regular = /[a-z]+/;

	const navigation = useNavigate();
	const { handleSubmit, reset, control } = useForm();
	const [pin, setPin] = React.useState(null);

	const [load, setLoad] = React.useState(false);
	const [arr, setArr] = React.useState([]);

	const [fullWidth, setFullWidth] = React.useState(true);
	const [maxWidth, setMaxWidth] = React.useState('sm');
	const [open, setOpen] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleClose = () => {
		setOpen(false);
	};

	React.useEffect(async () => {

		try {
			await onSnapshot(doc(db, "client", secureLocalStorage.getItem("USER")), (doc) => {
				setPin(doc.data().code);
			});
		} catch {
			window.console.log(`Erreur`);
		}

	}, []);


	let valuepret = secureLocalStorage.getItem("^^pret->value");
	let colpret = 'pret' + secureLocalStorage.getItem("USER");

	React.useEffect(async () => {

		const querySnapshot = await getDocs(collection(db, colpret));
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			pushDocs.push(doc.id);
		});

		setArr(pushDocs);

	}, []);

	const onSubmit = async (data) => {

		setLoad(true);
		if (data.code === undefined) {
			setOpen(true);
			setLoad(false);
			reset();

		} else {

			if (data.code.length != 6 || regular.test(data.code)) {
				setOpen(true);
				setLoad(false);
				reset();

			} else {

				if (pin != data.code) {
					setOpen(true);
					setLoad(false);
					reset();
				} else {

					arr.map(index => {
						historypretRemove(colpret, index);
					});

					asKedpretActive();
					asKedpret(secureLocalStorage.getItem("^^pret->value"));
					asKedDecrimentpret(secureLocalStorage.getItem("^^pret->count"));
					historypretRemove('pret', secureLocalStorage.getItem("USER"));

					if (secureLocalStorage.getItem("^^pret->part")) {
						asKedpretpart(valuepret);
					}

					secureLocalStorage.setItem("^^pret%%finish->ok", true);
					secureLocalStorage.setItem("^^pret->ok", false);
					secureLocalStorage.setItem("^^pret->", false);

					secureLocalStorage.setItem("^^pret->part", false);
					secureLocalStorage.setItem("^^snack->all", true);

					window.setTimeout(() => {
						window.location.href = "/dash";
					}, 2500);


				}

			};

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

			<form onSubmit={handleSubmit(onSubmit)}>

				<FormControl
					sx={{ width: '100%' }}

					variant="standard">
					<InputLabel htmlFor="standard-adornment-password"><span className='pop-up'>Pin actuel</span></InputLabel>

					<Controller
						name="code"
						control={control}
						render={({ field }) =>

							<Input
								id="standard-adornment-password"
								{...field}
								type={showPassword ? 'numeric' : 'password'}
								inputProps={{
									autoComplete: "off", inputMode: 'numeric'
								}}

								endAdornment={
									<InputAdornment position="end">

										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>

									</InputAdornment>
								}

							/>}
					/>

				</FormControl>

				<Dialog
					fullWidth={fullWidth}
					maxWidth={maxWidth}
					open={open}
					onClose={handleClose}>

					<DialogTitle><h1 className='pop-up'>MuunganoMoney</h1></DialogTitle>
					<DialogContent>

						<DialogContentText>
							<p className='pop-up'>
								Code pin Incorrect
     </p>
						</DialogContentText>

					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}><span className='pop-up'>Fermer</span></Button>
					</DialogActions>
				</Dialog>

				<button className='Btn-Broker'>Envoi</button>
			</form>

		</>
	);
};


// add pret for client
export async function asKedpret(prix) {
	const washingtonRef = doc(db, "pret", secureLocalStorage.getItem("USER"));

	// Set the "capital" field of the city 'DC'
	await updateDoc(washingtonRef, {
		cdf: increment(-prix),
		pretcdf: increment(-prix),
		date: moment().format()
	});

};
// add pret for client
export async function asKedpretpart(prix) {
	const washingtonRef = doc(db, "pret", secureLocalStorage.getItem("USER"));

	// Set the "capital" field of the city 'DC'
	await updateDoc(washingtonRef, {
		cdf: prix,
		pretcdf: prix,
		date: moment().format()
	});

};
export async function asKedDecrimentpret(prix) {

	const washingtonRef = doc(db, "client", secureLocalStorage.getItem("USER"));
	// Set the "capital" field of the city 'DC'
	await updateDoc(washingtonRef, {
		cdf: increment(-prix)
	});

};
// add pret for client active
export async function asKedpretActive() {
	const washingtonRef = doc(db, "client", secureLocalStorage.getItem("USER"));
	// Set the "capital" field of the city 'DC'
	await updateDoc(washingtonRef, {
		pret: false,
		pretactive: false,
		pretregister: false
	});

};
// view pret 
export async function collectionPret(userCollection, userDocs, current, pret, reimburse) {

	let obj = { pret: pret, reimburse: reimburse, current: current, devise: false };
	await setDoc(doc(db, userCollection, userDocs), { date: moment().format(), data: arrayUnion(obj), devise: false }, { merge: true });

};

async function historypretRemove(colpret, folder) {
	await deleteDoc(doc(db, colpret, folder));
};


