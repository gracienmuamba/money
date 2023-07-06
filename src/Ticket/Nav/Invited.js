import React from 'react';
import IconButton from '@mui/material/IconButton';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import secureLocalStorage from "react-secure-storage";
import { db } from '../../firebase';
import { doc, collection, getDocs, getDocFromCache } from "firebase/firestore";
import ReturnMsg from './Msg';
import { useReactToPrint } from 'react-to-print';



let pushDocs = new Array();



// view invite component
export default function ReturnInvited() {

  const [dimensions, setDimensions] = React.useState({ width: 60, height: 180 });
  const [open, setOpen] = React.useState(false);
  const [list, setList] = React.useState([]);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data',
    onAfterPrint: () => window.console.log('print success'),

    pageStyle: `@media print {
      @page {
       size: ${dimensions.width}mm ${dimensions.height}mm;
        margin: 0;
      }
    }`,
  });

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

  React.useEffect(async () => {

    const querySnapshotClient = await getDocs(collection(db, "client"));
    querySnapshotClient.forEach((doc) => {
      pushDocs.push(doc.id);
    });

    var verifierCollection = pushDocs.some((value) => value == secureLocalStorage.getItem("USER"));
    const docRef = doc(db, verifierCollection ? "client" : "agent", secureLocalStorage.getItem("USER"));
    // Get a document, forcing the SDK to fetch from the offline cache.
    try {
      const doc = await getDocFromCache(docRef);
      // Document was found in the cache. If no cached document exists,
      setList(doc.data().swap);
    } catch (e) {
      console.log("Error getting cached document:", e);
    };

  }, []);

  let col = pushDocs.includes(secureLocalStorage.getItem("USER"));

  return (
    <>
      <div ref={componentRef} style={{ height: window.innerHeight }}>
        <ReturnMsg />
      </div>

      <div className='tontine-send-invited'>
        {!col &&
          <div onClick={handlePrint}>
            <IconButton>
              <img src={'/img/printing.png'} />
            </IconButton>
          </div>
        }
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
              Désolé, vous n'appartenez à aucun groupe Tontine
       </p>
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}><span className='pop-up'>Fermer</span></Button>
        </DialogActions>
      </Dialog>

    </>
  );
};