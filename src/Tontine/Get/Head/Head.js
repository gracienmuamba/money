import * as React from 'react';
import './Head.css';
import ReturnProfil from './Profil';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';

import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';


let Acces = true;
let listRising = new Array();

function DrawerAppBar() {

	const [load, setLoad] = React.useState(false);
	const [money, setMoney] = React.useState(['']);
	const [devise, setDevise] = React.useState(['']);

	const pushDocs = JSON.parse(window.localStorage.getItem('&&view$$list£¢ton…'));
	const pushOther = JSON.parse(window.localStorage.getItem('&&view$$list£¢toncol§§-…'));

	React.useEffect(async () => {
		[...pushOther].map((item) => {

			const unsub = onSnapshot(doc(db, "tontine", item), (doc) => {
				window.setTimeout(() => {
					listRising.push(doc.data().rising === undefined ? 0 : doc.data().rising);
				}, 500);

			});

		})
	}, []);

	React.useEffect(async () => {
		const unsub = onSnapshot(doc(db, "client", JSON.parse(window.localStorage.getItem('USER'))), (doc) => {

			setMoney(doc.data().grouptontinemoney === undefined ? [''] : doc.data().grouptontinemoney);
			setDevise(doc.data().grouptontinedevise === undefined ? [''] : doc.data().grouptontinedevise);

		});

	}, []);

	const navigation = useNavigate();
	const handlepath = (event) => {
		event.preventDefault();
		navigation(-1);

	};


	if (Array.isArray(pushDocs) && pushDocs.length) {
		Acces = true;
	} else {
		Acces = false;
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

			<div className='flex-head-list-tontine'>
				<header>
					<div className='container'>
						<nav className='navbar'>

							<HiArrowLeft onClick={handlepath} size={'1.6em'} color={'white'} className={'array-static-navbar'} />
							<ReturnProfil />

						</nav>
					</div>
				</header>

				<section>
					{
						Acces ?
							<ul>
								{
									[...Array(pushDocs.length).keys()].map(index => {


										let argent = '';
										argent = (devise[index]) === undefined ? 'USD' : 'CDF';

										return (
											<div onClick={async () => {

												setLoad(true);
												window.localStorage.setItem('¥¥˙´¸list˘˘22˚˚fil', JSON.stringify(pushOther[index]));
												const unsub = onSnapshot(doc(db, "tontine", pushOther[index]), (doc) => {
													window.localStorage.setItem('¥¥˙´¸list˘˘˚˚', JSON.stringify((doc.data().table)));
												});

												window.setTimeout(() => {
													window.location.href = "/tontine/get/widthdraw";
												}, 5800);

											}}>

												<List>
													<ListItem disablePadding>
														<ListItemButton>

															<li key={index}>
																<div className='cmd-operator-title'>

																	<div className='cmd-operator-sub-title'>
																		<div className='flex-row-cmd-group'>
																			<p>{pushDocs[index].charAt(0).toUpperCase() + pushDocs[index].slice(1)}</p>
																		</div>
																	</div>

																</div>

																{/* <p>{money[index]} {(devise[index]).includes('USD') ? 'USD' : 'CDF'}</p> */}
																{/* <p>{money[index]} {(devise[index])}</p> */}
																<p>{money[index]} {argent.includes('USD') ? 'USD' : 'CDF'}</p>
															</li>

														</ListItemButton>
													</ListItem>
												</List>
												<Divider />
											</div>
										)
									})}
							</ul>
							: <div></div>
					}
				</section>
			</div>
		</>
	);
}

export default DrawerAppBar;