import React from 'react';
import Media from 'react-media';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';

import './Btn.css';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import { useNavigate } from 'react-router-dom';


// Btn view component 
export default function ReturnBtn() {
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
	<div className='tontine-btn-next-budget'>
		<View />
	</div>
);
export const ScreenSmall = () => (
	<div className='tontine-btn-next-budget-sm'>
		<View />
	</div>
);

export function View() {

	const navigation = useNavigate();
	const [rising, setRising] = React.useState(0);
	const [asked, setAsked] = React.useState(0);

	const [open, setOpen] = React.useState(false);

	const [fullWidth, setFullWidth] = React.useState(true);
	const [maxWidth, setMaxWidth] = React.useState('sm');


	const [active, setActive] = React.useState(false);

	const [position, setPosition] = React.useState(0);
	const [count, setCount] = React.useState(0);
	const [askedPosition, setAskedPosition] = React.useState(0);

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

	let colTon = JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘22˚˚fil'));
	let listNumber = JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘˚˚'));

	React.useEffect(async () => {
		const unsub = onSnapshot(doc(db, colTon, JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
			setActive(doc.data().soldeactive);
		});

	}, []);
	React.useEffect(async () => {
		const unsub = onSnapshot(doc(db, 'tontine', colTon), (doc) => {
			setPosition(doc.data().position);
			setCount(doc.data().count);
			setAskedPosition(doc.data().askedposition);
			setAsked(doc.data().asked);
			setRising(doc.data().rising);
		});

	}, []);


	const handlepath = (event) => {

		event.preventDefault();

		window.localStorage.setItem('^^$%list++::act::', JSON.stringify((count) === (Number(position) + 1) ? true : false));
		window.localStorage.setItem('***#$$view..<<valid++', JSON.stringify(true));
		window.localStorage.setItem('***#$$pso..<<add++', JSON.stringify(position));
		window.localStorage.setItem('***#$$pso..<<askedpos**++', JSON.stringify(listNumber[askedPosition]));

		window.setTimeout(() => {

			if (Number(count) === (Number(position) + 1)) {

				window.console.log('all');
				if ((Number(askedPosition) + 1) === Number(count)) {

					window.localStorage.setItem('&&**++<///last{}', JSON.stringify(true));
					window.localStorage.setItem('!@@++baskte&&++', JSON.stringify(Number(asked) + Number(rising)));


				} else {
					window.localStorage.setItem('&&**++<///last{}', JSON.stringify(false));
					window.localStorage.setItem('!@@++baskte&&++', JSON.stringify(Number(asked)));
				}

				navigation('/tontine/list/group/child/budget/pin/all');

			} else {
				window.console.log('not all')
				window.localStorage.setItem('&&**++<///last{}', JSON.stringify(false));
				navigation('/tontine/list/group/child/budget/pin');
			}

		}, 550);

	};

	return (
		<>
			{active || Number(askedPosition) === Number(count) ? <div></div> : <button onClick={handlepath}>Accumulation <img src={'/img/customer.png'} /></button>}
			<Dialog
				fullWidth={fullWidth}
				maxWidth={maxWidth}
				open={open}
				onClose={handleClose}
			>
				<DialogTitle><p className='pop-up'>MuunganoMoney</p></DialogTitle>
				<DialogContent>

					<DialogContentText>
						<p className='pop-up'>
							Désolé, vous n'appartenez à aucun groupe Tontine
       </p>
					</DialogContentText>

				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}><span className='pop-up'>Fermer</span></Button>
				</DialogActions>
			</Dialog>

		</>
	)
};