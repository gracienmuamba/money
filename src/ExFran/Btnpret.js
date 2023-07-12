import React from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';


import secureLocalStorage from "react-secure-storage";


let pushDocs = new Array();
let pretDocs = new Array();


// Button blocked
export default function ReturnBtnPreT() {

  const navigation = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [roll, setRoll] = React.useState(false);

  const [pret, setPret] = React.useState(false);
  const [pretactive, setPretactive] = React.useState(false);
  const [pretregister, setPretregister] = React.useState(false);

  const [price, setPrice] = React.useState(0);
  const [list, setList] = React.useState([]);


  React.useEffect(async () => {

    const querySnapshot = await getDocs(collection(db, "client"));
    querySnapshot.forEach((doc) => {
      pushDocs.push(doc.id);
    });

    const querySnapshotpret = await getDocs(collection(db, "pret"));
    querySnapshotpret.forEach((doc) => {
      pretDocs.push(doc.id);
    });


    if (pretDocs.includes(secureLocalStorage.getItem("A@@ph$$&-@#"))) {

      try {
        const unsub = onSnapshot(doc(db, "pret", secureLocalStorage.getItem("A@@ph$$&-@#")), (doc) => {
          setPrice(doc.data().cdf === undefined ? 0 : doc.data().cdf);
        });

      } catch (e) {
        window.console.log(e)
      }

    }



    setList(pushDocs);

  }, []);

  React.useEffect(async () => {

    const querySnapshot = await getDocs(collection(db, "client"));
    querySnapshot.forEach((doc) => {
      pushDocs.push(doc.id);
    });

    if (pushDocs.includes(secureLocalStorage.getItem("A@@ph$$&-@#"))) {

      try {
        const unsub = onSnapshot(doc(db, "client", secureLocalStorage.getItem("A@@ph$$&-@#")), (doc) => {
          setPret(doc.data().pret);
          setPretactive(doc.data().pretactive);
          setPretregister(doc.data().pretregister);
        });

      } catch (e) {
        window.console.log(e)
      }


    }

  }, []);


  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const handleClose = () => {
    setOpen(false);
  };
  const handleRoll = () => {
    setRoll(false);
  };

  const handlepath = async (event) => {

    event.preventDefault();

    if (list.includes(secureLocalStorage.getItem("A@@ph$$&-@#")) && pret && pretactive && pretregister) {

      if (pretDocs.includes(secureLocalStorage.getItem("A@@ph$$&-@#"))) {

        if (price >= 1000) {
          window.console.log('well connexion!!');
          navigation('/exchange/refunded/franc');
        } else {
          setRoll(true);
        }
      } else {
        setOpen(true);
      }
    } else {
      setOpen(true);
    }

  };

  return (
    <>
      <button style={{ padding: '.5em', }} onClick={handlepath} className={'Btn-pret'}>
        <span>
          Remboursé Prêt
   </span>
      </button>

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

              Désolé. Ce numéro ne contient aucun prêt, veuillez contacter MuunganoMoney.


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
        open={roll}
        onClose={handleRoll}
      >
        <DialogTitle><p className='pop-up'>MuunganoMoney</p></DialogTitle>
        <DialogContent>

          <DialogContentText>
            <p className='pop-up'>

              Le remboursement du prêt ne peut pas être effectué, veuillez contacter
              MuunganoMoney pour plus d'informations

       </p>
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleRoll}><span className='pop-up'>Fermer</span></Button>
        </DialogActions>
      </Dialog>

    </>
  );
};