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

	const [open, setOpen] = React.useState(false);
	const [fullWidth, setFullWidth] = React.useState(true);
	const [maxWidth, setMaxWidth] = React.useState('sm');
	const [active, setActive] = React.useState(false);

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
	let counTton = JSON.parse(window.localStorage.getItem('>>pos;;{}$$**++==count...'));
	let tonActive = JSON.parse(window.localStorage.getItem('>>pos;;{}$$++==act...'));

	let listNumber = JSON.parse(window.localStorage.getItem('¥¥˙´¸list˘˘˚˚'));
	let numPosition = JSON.parse(window.localStorage.getItem('>>pos;;{}$$++=='));


	React.useEffect(async () => {
		const unsub = onSnapshot(doc(db, colTon, JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
			setActive(doc.data().soldeactive);
		});

	}, []);
	const handlepath = (event) => {

		event.preventDefault();
		window.localStorage.setItem('^^$%list++::act::', JSON.stringify(counTton === tonActive + 1 ? true : false));
		window.localStorage.setItem('^^$%tour++::&&$$::', JSON.stringify(listNumber[numPosition]));
		navigation('/tontine/list/group/child/budget/pin');
	};

	return (
		<>
			{active ? <div></div> : <button onClick={handlepath}>Accumuler</button>}
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
}