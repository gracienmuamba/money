import React from 'react';
import './Avatar.css';
import Media from 'react-media';
import { collection, getDocs, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, storage } from '../firebase';
import { ref, uploadBytes, deleteObject, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { VscCheck } from 'react-icons/vsc';


let pushDocs = new Array();


function CircularProgressWithLabel(props) {
 return (
  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
   <CircularProgress variant="determinate" {...props} />
   <Box
    sx={{
     top: 0,
     left: 0,
     bottom: 0,
     right: 0,
     position: 'absolute',
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
    }}
   >
    <Typography variant="caption" component="div" color="text.secondary">
     {`${Math.round(props.value)}%`}
    </Typography>
   </Box>
  </Box>
 );
}

CircularProgressWithLabel.propTypes = {
 /**
  * The value of the progress indicator for the determinate variant.
  * Value between 0 and 100.
  * @default 0
  */
 value: PropTypes.number.isRequired,
};


// Avatar IMAGE VIew
export default function ReturnAvataR() {
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
 <div className='wrp-avatar-profil'>
  <div className='avatar-circle-profil'>
   <LetteRName />
  </div>
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-avatar-profil-sm'>
  <div className='avatar-circle-profil-sm'>
   <LetteRName />
  </div>
 </div>
);
export const LetteRName = () => {

 const [imageUpload, setImageUpload] = React.useState(null);
 const [url, setUrl] = React.useState(null);
 const [profil, setProfil] = React.useState(null);
 const [progress, setProgress] = React.useState(0);
 const [viewBtn, setViewBtn] = React.useState(false);
 const [exten, setExten] = React.useState(null);

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   pushDocs.push(doc.id);
  });

  const toCollection = pushDocs.includes(JSON.parse(window.localStorage.getItem('USER')));
  const unsub = onSnapshot(doc(db, toCollection ? "client" : "agent", JSON.parse(window.localStorage.getItem('USER'))), (doc) => {
   setProfil(doc.data().profile);
   setExten(doc.data().extension);
  });

 }, []);

 const uploadImage = async () => {

  if (imageUpload == null)
   return;

  const imgRef = imageUpload.name + v4();
  const imageRef = ref(storage, `image/${imgRef}`);
  uploadBytes(imageRef, imageUpload).then(() => {

   getDownloadURL(imageRef, imageUpload).then((url) => {

    const uploadTask = uploadBytesResumable(imageRef, imageUpload)
    uploadTask.on('state_changed', (snapshot) => {
     const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
     setProgress(prog);
    },
     (err) => window.console.log(err), () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url))
     })

    setUrl(url);
    const collect = pushDocs.includes(JSON.parse(window.localStorage.getItem('USER')));
    const washingtonRef = doc(db, collect ? "client" : "agent", JSON.parse(window.localStorage.getItem('USER')));
    // Set the "capital" field of the city 'DC'
    updateDoc(washingtonRef, {
     profile: url,
     extension: imgRef
    });

   }).catch(error => { window.console.log(error.message) })
   setImageUpload(null);

  }).catch(error => { window.console.log(error.message) });
  setViewBtn(false);

  window.console.log(imgRef);
  if (exten != 'extension') {

   // Create a reference to the file to delete
   const desertRef = ref(storage, `image/${exten}`);
   // Delete the file
   deleteObject(desertRef).then(() => {
    // File deleted successfully
    window.console.log('Success remove image');

   }).catch((error) => {
    window.console.log('Error Reomve');
    // Uh-oh, an error occurred!
   });
  }

 }

 return (
  <div className='wrp-profil-avatar-user'>

   <IconButton color="primary" aria-label="upload picture" component="label">
    <div className='profile-user'>

     <img src={profil} />

     <input
      hidden
      accept="image/*"
      type="file"
      onChange={(event) => {
       setImageUpload(event.target.files[0]);
       setViewBtn(true);
      }
      }

     />
     <div className='icon-camera-profil'>
      <PhotoCamera />
     </div>
    </div>
   </IconButton>

   <CircularProgressWithLabel value={progress} />
   {viewBtn && <button onClick={uploadImage}>
    <span>Cliqué pour changer image </span><VscCheck size={'1.2em'} /></button>}
  </div>
 );
};

