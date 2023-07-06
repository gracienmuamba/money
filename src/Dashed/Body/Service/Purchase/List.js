import React from 'react';
import './List.css';
import { useNavigate } from 'react-router-dom';
import ReturnICOn from './Icon';
import Media from 'react-media';

import { collection, getDocs, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import secureLocalStorage from "react-secure-storage";


let pushArray = new Array();


// Purchase List Component 
export default function ReturnListPurchAse() {
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
          {matches.medium && <ScreenMedium />}
          {matches.large && <ScreenLarge />}
        </>
      )}
    </Media>
  );
};

export const ScreenLarge = () => (
  <div className='wrp-list-purchase-dashed'>
    <View />

  </div>
);
export const ScreenMedium = () => (
  <div className='wrp-list-purchase-dashed-md'>
    <View />

  </div>
);
export const ScreenSmall = () => (
  <div className='wrp-list-purchase-dashed-sm'>
    <View />

  </div>
);
export const View = () => {

  var navigatorInfo = window.navigator;
  var navigatorScreen = window.screen;

  var uid = navigatorInfo.mimeTypes.length;
  uid += navigatorInfo.userAgent.replace(/\D+/g, '');
  uid += navigatorInfo.plugins.length;

  uid += navigatorScreen.height || '';
  uid += navigatorScreen.width || '';
  uid += navigatorScreen.pixelDepth || '';
  uid += secureLocalStorage.getItem("USER");


  let pushDocs = new Array();
  const navigation = useNavigate();
  const [load, setLoad] = React.useState(false);

  const [Open, setOpen] = React.useState(false);
  const [pretOpen, setPretOpen] = React.useState(false);
  const [status, setStatus] = React.useState(null);
  const [team, setTeam] = React.useState('simple');

  const [pret, setPret] = React.useState(null);
  const [pretregister, setPretregister] = React.useState(null);
  const [pretactive, setPretactive] = React.useState(null);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const [confirm, setConfirm] = React.useState(false);

  React.useEffect(async () => {

    const querySnapshot = await getDocs(collection(db, "client"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      pushArray.push(doc.id);

    });

    setConfirm(pushArray.includes(secureLocalStorage.getItem("USER")));

  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handlePretClose = () => {
    setPretOpen(false);
  };

  React.useEffect(async () => {

    const querySnapshot = await getDocs(collection(db, "client"));
    querySnapshot.forEach((doc) => {
      pushDocs.push(doc.id);
    });

    const verifierCollection = pushDocs.some((value) => value == secureLocalStorage.getItem("USER"));
    const unsub = onSnapshot(doc(db, verifierCollection ? "client" : "agent", secureLocalStorage.getItem("USER")), (doc) => {
      setStatus(doc.data().state);
      setTeam(doc.data().team);
      setPret(doc.data().pret);
      setPretregister(doc.data().pretregister);
      setPretregister(doc.data().pretregister);
      setPretactive(doc.data().pretactive);
    });

  }, []);

  const handlepathregister = async (event) => {

    event.preventDefault();
    setLoad(true);

    const frankDocRef = doc(db, confirm ? "client" : "agent", secureLocalStorage.getItem("USER"));
    // To update age and favorite color:
    await updateDoc(frankDocRef, {
      ip: uid
    });

    if (status === 'agent') {
      navigation('/register');
    } else {
      setPretOpen(true);
    }

  };
  const handlepathfiat = async (event) => {

    event.preventDefault();
    setLoad(true);


    const frankDocRef = doc(db, confirm ? "client" : "agent", secureLocalStorage.getItem("USER"));
    // To update age and favorite color:
    await updateDoc(frankDocRef, {
      ip: uid
    });

    if (team === 'mere') {
      navigation('/brokers/sign/fiat');
    } else {
      setPretOpen(true);
    }

  };
  const handlepathstock = async (event) => {

    event.preventDefault();
    setLoad(true);

    const frankDocRef = doc(db, confirm ? "client" : "agent", secureLocalStorage.getItem("USER"));
    // To update age and favorite color:
    await updateDoc(frankDocRef, {
      ip: uid
    });

    if (team === 'mere') {
      navigation('/stock/fiat');
    } else {
      setPretOpen(true);
    }

  };
  const handlepathinvalid = async (event) => {
    event.preventDefault();
    setLoad(true);
    setOpen(true);

    const frankDocRef = doc(db, confirm ? "client" : "agent", secureLocalStorage.getItem("USER"));
    // To update age and favorite color:
    await updateDoc(frankDocRef, {
      ip: uid
    });

  };
  const handlepathcommand = async (event) => {

    event.preventDefault();
    setLoad(true);

    const frankDocRef = doc(db, confirm ? "client" : "agent", secureLocalStorage.getItem("USER"));
    // To update age and favorite color:
    await updateDoc(frankDocRef, {
      ip: uid
    });


    if (status === 'client') {
      navigation('/brokers/caise');
    } else if (status === 'agent' && team === 'mere') {
      updateAuthIPFirebase(confirm);
      navigation('/command/agent');

    } else {
      window.console.log('thank');
    }

  };
  const handlepathpret = async (event) => {

    event.preventDefault();
    setLoad(true);
    const frankDocRef = doc(db, confirm ? "client" : "agent", secureLocalStorage.getItem("USER"));
    // To update age and favorite color:
    await updateDoc(frankDocRef, {
      ip: uid
    });

    if (pret === true && pretregister === true && pretactive === true) {
      navigation('/pret/dash');

      secureLocalStorage.setItem("^^snack->", false);

    } else if (pret === true && pretregister === true) {
      navigation('/pret/send');
    } else {
      navigation('/pret');
    }


  };
  const handlepathtontine = async (event) => {
    event.preventDefault();
    setLoad(true);

    const frankDocRef = doc(db, confirm ? "client" : "agent", secureLocalStorage.getItem("USER"));
    // To update age and favorite color:
    await updateDoc(frankDocRef, {
      ip: uid
    });

    secureLocalStorage.setItem("^^add&&@!!**", false);
    secureLocalStorage.setItem("??next^^**$$", false);
    secureLocalStorage.setItem("prix^^&&not**", false);

    navigation('/tontine');
  }

  return (
    <>
      <div className='zindex-theme'>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={load}>

          <CircularProgress color="inherit" />
        </Backdrop>
      </div>

      <nav className='Anima'>
        <ul>

          <li onClick={() => navigation('/valid-fc')}>
            <div className='wrp-list-abs'>
              <ReturnICOn IMA={'/img/money.png'} />
              <span>
                Envoi Monnaies
       </span>
            </div>
          </li>

          {(status === 'agent' && team === 'simple') &&
            <li onClick={() => navigation('/brokers/unite')}>
              <div className='wrp-list-abs'>
                <ReturnICOn IMA={'/img/stock.png'} />
                <span>
                  Unité stock
     </span>
              </div>
            </li>

          }

          {((status === 'agent' && team === 'mere') || status === 'client') &&
            <li onClick={() => navigation('/brokers/unite')}>
              <div className='wrp-list-abs'>
                <ReturnICOn IMA={'/img/mobile-phones.png'} />
                <span>
                  Unité
     </span>
              </div>

            </li>

          }

          {(status === 'agent' && team === 'mere') &&
            <li onClick={handlepathstock}>
              <div className='wrp-list-abs'>
                <ReturnICOn IMA={'/img/Stock.png'} />
                <span>
                  Unité stock
        </span>
              </div>
            </li>
          }

          <li onClick={handlepathinvalid}>
            <div className='wrp-list-abs'>
              <ReturnICOn IMA={'/img/electricity.png'} />
              <span>
                Muungano Énergie
        </span>
            </div>
          </li>

          <li onClick={handlepathinvalid}>
            <div className='wrp-list-abs'>
              <ReturnICOn IMA={'/img/television.png'} />
              <span>
                TV
     </span>
            </div>
          </li>

          {(status === 'agent' && team === 'mere') &&
            <li onClick={handlepathfiat}>
              <div className='wrp-list-abs'>
                <ReturnICOn IMA={'/img/add-fiat.png'} />
                <span>
                  Enregistré Fiat
       </span>
              </div>
            </li>

          }
          <li onClick={() => navigation('/wallet')}>
            <div className='wrp-list-abs'>
              <ReturnICOn IMA={'/img/donate.png'} />
              <span>
                Coffres
       </span>
            </div>
          </li>


          {status === 'client' &&
            <li onClick={handlepathpret}>
              <div className='wrp-list-abs'>
                <span>
                  <ReturnICOn IMA={'/img/pret.png'} />
                </span>
                <span>
                  Prêt
       </span>
              </div>
            </li>
          }

          {(status === 'agent') &&
            <li onClick={handlepathregister}>
              <div className='wrp-list-abs'>
                <ReturnICOn IMA={'/img/enroll.png'} />
                <span>
                  Enregistré Client
       </span>
              </div>
            </li>
          }

          {status === 'client' &&
            <li onClick={handlepathtontine}>
              <div className='wrp-list-abs'>
                <ReturnICOn IMA={'/img/friends.png'} />
                <span>
                  Tontine
       </span>
              </div>
            </li>
          }

          {(status === 'agent' && team === 'mere') &&
            <li onClick={handlepathcommand}>
              <div className='wrp-list-abs'>
                <ReturnICOn IMA={'/img/caise.png'} />
                <span>
                  Commande
           </span>
              </div>
            </li>

          }
        </ul>

        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={pretOpen}
          onClose={handlePretClose}>

          <DialogTitle><span className='pop-up'>MuunganoMoney</span></DialogTitle>
          <DialogContent>

            <DialogContentText>
              <p className='pop-up'>
                Désolé, vous n'êtes pas autorisé à utiliser ce service
            </p>
            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={handlePretClose}><span className='pop-up'>Fermer</span></Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={Open}
          onClose={handleClose}>

          <DialogTitle><span className='pop-up'>MuunganoMoney</span></DialogTitle>
          <DialogContent>

            <DialogContentText>
              <p className='pop-up'>
                Ce service est actuellement indisponible
            </p>
            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}><span className='pop-up'>Fermer</span></Button>
          </DialogActions>
        </Dialog>

      </nav>

    </>
  );
};

export const updateAuthIPFirebase = async (check) => {

  var navigatorInfo = window.navigator;
  var navigatorScreen = window.screen;

  var uid = navigatorInfo.mimeTypes.length;
  uid += navigatorInfo.userAgent.replace(/\D+/g, '');
  uid += navigatorInfo.plugins.length;

  uid += navigatorScreen.height || '';
  uid += navigatorScreen.width || '';
  uid += navigatorScreen.pixelDepth || '';
  uid += secureLocalStorage.getItem("USER");

  const cityRef = doc(db, check ? 'client' : 'agent', secureLocalStorage.getItem("USER"));
  setDoc(cityRef, { ip: uid }, { merge: true });

};

