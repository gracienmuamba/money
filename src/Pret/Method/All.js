import React from 'react';
import './All.css';
import { TweenMax, Expo } from 'gsap';
import { useNavigate } from 'react-router-dom';

import { doc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import secureLocalStorage from "react-secure-storage";


// View all 
export default function ReturnAll() {

  let pushDocs = new Array();

  const navigation = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [arr, setArr] = React.useState(false);

  let pret = secureLocalStorage.getItem("&&money::pret__");
  let wallet = secureLocalStorage.getItem("&&money::wallet__");
  let unite = secureLocalStorage.getItem("&&money::unite__");


  const handleClose = () => {
    setOpen(false);
  };

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');


  React.useEffect(() => {
    TweenMax.from('.Anima', 1.2, { delay: 1.2, opacity: 0, x: 20, ease: Expo.easeIn });
  }, []);

  let colpret = 'pret' + secureLocalStorage.getItem("USER");

  React.useEffect(async () => {

    const querySnapshot = await getDocs(collection(db, colpret));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      pushDocs.push(doc.id);
    });

    setArr(pushDocs);

  }, [])

  const handlechange = async (event) => {

    event.preventDefault();

    if (unite === 'usd') {

      if (wallet <= 1 || wallet < pret || parseInt(wallet) - parseInt(pret) <= 1) {
        setOpen(true);
      } else {

        secureLocalStorage.setItem('^^pret->value', Number(pret));
        secureLocalStorage.setItem("^^pret->count", Number(pret));
        secureLocalStorage.setItem("^^pret->ok", true);
        secureLocalStorage.setItem("^^pret->value", Number(pret));

        arr.map(index => {
          historypretRemove(colpret, index);
        });

        window.setTimeout(() => {
          navigation('/pret/pin/dollar');
        }, 200);

      }

    } else {


      if (wallet <= 2000 || wallet < pret || parseInt(wallet) - parseInt(pret) <= 2000) {
        setOpen(true);
      } else {

        arr.map(index => {
          historypretRemove(colpret, index);
        });

        secureLocalStorage.setItem('^^pret->value', Number(pret));
        secureLocalStorage.setItem("^^pret->count", Number(pret));
        secureLocalStorage.setItem("^^pret->ok", true);

        window.setTimeout(() => {
          navigation('/pret/pin/fran');
        }, 200);

      }

    }

  }

  return (
    <>
      <div onClick={handlechange} className='all-pret-method Anima'>
        <img src={'/img/refund.png'} />
        <p>Tout</p>
      </div>

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
              Désolé, le montant de votre portefeuille est
              insuffisant pour effectuer ce remboursement
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


async function historypretRemove(colpret, folder) {
  await deleteDoc(doc(db, colpret, folder));
};
