// import React from 'react';
// import './Pieces.css';
// import Media from 'react-media';
// import { collection, getDocs, doc, onSnapshot, updateDoc } from "firebase/firestore";
// import { db, storage } from '../../firebase';

// import { ref, uploadBytes, deleteObject, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
// import { v4 } from 'uuid';
// import IconButton from '@mui/material/IconButton';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';

// import PropTypes from 'prop-types';
// import CircularProgress from '@mui/material/CircularProgress';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import { VscCheck } from 'react-icons/vsc';

// // import Box from '@mui/material/Box';
// // import CircularProgress from '@mui/material/CircularProgress';
// import { green } from '@mui/material/colors';
// import Button from '@mui/material/Button';
// import Fab from '@mui/material/Fab';
// import CheckIcon from '@mui/icons-material/Check';
// import SaveIcon from '@mui/icons-material/Save';


// let pushPieces = new Array();

// function CircularProgressWithLabel(props) {
//  return (
//   <Box sx={{ position: 'relative', display: 'inline-flex' }}>
//    <CircularProgress variant="determinate" {...props} />
//    <Box
//     sx={{
//      top: 0,
//      left: 0,
//      bottom: 0,
//      right: 0,
//      position: 'absolute',
//      display: 'flex',
//      alignItems: 'center',
//      justifyContent: 'center',
//     }}
//    >
//     <Typography variant="caption" component="div" color="text.secondary">
//      {`${Math.round(props.value)}%`}
//     </Typography>
//    </Box>
//   </Box>
//  );
// }

// CircularProgressWithLabel.propTypes = {
//  /**
//   * The value of the progress indicator for the determinate variant.
//   * Value between 0 and 100.
//   * @default 0
//   */
//  value: PropTypes.number.isRequired,
// };


// // Avatar IMAGE VIew
// export default function ReturnIDPreT() {
//  return (
//   <Media
//    queries={{
//     small: '(max-width: 599px)',
//     medium: '(min-width: 600px) and (max-width:1199px)',
//     large: '(min-width: 1200px)',
//    }}>
//    {matches => (
//     <>
//      {matches.small && <ScreenSmall />}
//      {matches.medium && <ScreenLarge />}
//      {matches.large && <ScreenLarge />}
//     </>
//    )}
//   </Media>
//  );
// };

// export const ScreenLarge = () => (
//  <div className='wrp-avatar-pieces'>
//   <div className='avatar-circle-pieces'>
//    <IDPret />
//   </div>
//  </div>
// );
// export const ScreenSmall = () => (
//  <div className='wrp-avatar-pieces-sm'>
//   <div className='avatar-circle-pieces-sm'>
//    <IDPret />
//   </div>
//  </div>
// );
// export const IDPret = () => {

//  const [imageUpload, setImageUpload] = React.useState(null);
//  const [url, setUrl] = React.useState(null);
//  const [profil, setProfil] = React.useState(null);
//  const [progress, setProgress] = React.useState(0);
//  const [viewBtn, setViewBtn] = React.useState(false);
//  const [exten, setExten] = React.useState(null);

//  const [loading, setLoading] = React.useState(false);
//  const [success, setSuccess] = React.useState(false);
//  const timer = React.useRef();

//  const buttonSx = {
//   ...(success && {
//    bgcolor: green[500],
//    '&:hover': {
//     bgcolor: green[700],
//    },
//   }),
//  };

//  React.useEffect(async () => {

//   const querySnapshot = await getDocs(collection(db, "client"));
//   querySnapshot.forEach((doc) => {
//    // doc.data() is never undefined for query doc snapshots
//    pushPieces.push(doc.id);
//   });

//   // const toCollection = pushPieces.includes(secureLocalStorage.getItem("USER"));

//   const unsub = onSnapshot(doc(db, "client", secureLocalStorage.getItem("USER")), (doc) => {
//    setProfil(doc.data().pretprofile);
//    setExten(doc.data().pretexten);
//   });

//   return () => {
//    clearTimeout(timer.current);
//   };

//  }, []);
//  const handleButtonClick = () => {
//   if (!loading) {
//    setSuccess(false);
//    setLoading(true);
//    timer.current = window.setTimeout(() => {
//     setSuccess(true);
//     setLoading(false);
//    }, 2000);
//   }
//  };
//  const uploadImage = async () => {

//   if (imageUpload == null)
//    return;

//   const imgRef = imageUpload.name + v4();
//   const imageRef = ref(storage, `pret/${imgRef}`);


//   uploadBytes(imageRef, imageUpload).then(() => {
//    getDownloadURL(imageRef, imageUpload).then((url) => {

//     const uploadTask = uploadBytesResumable(imageRef, imageUpload)
//     uploadTask.on('state_changed', (snapshot) => {
//      const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//      setProgress(prog);
//     },
//      (err) => window.console.log(err), () => {
//       getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url))
//      })

//     setUrl(url);
//     const collect = pushPieces.includes(secureLocalStorage.getItem("USER"));
//     const washingtonRef = doc(db, collect ? "client" : "agent", secureLocalStorage.getItem("USER"));
//     // Set the "capital" field of the city 'DC'
//     updateDoc(washingtonRef, {
//      pretprofile: url,
//      pretexten: imgRef
//     });

//    }).catch(error => { window.console.log(error.message) })
//    setImageUpload(null);

//   }).catch(error => { window.console.log(error.message) });
//   setViewBtn(false);

//   window.console.log(imgRef);
//   if (exten != '') {
//    // Create a reference to the file to delete
//    const desertRef = ref(storage, `pret/${exten}`);
//    // Delete the file
//    deleteObject(desertRef).then(() => {
//     // File deleted successfully
//     window.console.log('Success remove image');

//    }).catch((error) => {
//     window.console.log('Error Reomve');
//     // Uh-oh, an error occurred!
//    });
//   }

//  }

//  return (
//   <div className='wrp-pieces-avatar-user'>

//    <IconButton color="primary" aria-label="upload picture" component="label">
//     <div className='profile-user'>

//      <img src={'/img/uploadpret.jpg'} alt={'upload file'} />
//      <input
//       hidden
//       type="file"
//       onChange={(event) => {
//        setImageUpload(event.target.files[0]);
//        setViewBtn(true);
//       }}
//      />
//     </div>
//    </IconButton>

//    <CircularProgressWithLabel value={progress} />
//    {viewBtn &&
//     <div onClick={uploadImage}>
//      <Box sx={{ display: 'flex', alignItems: 'center' }}>
//       <Box sx={{ position: 'relative' }}>

//        <Fab

//         aria-label="save"
//         color="primary"
//         sx={buttonSx}
//         onClick={handleButtonClick}
//        >
//         {success ? <CheckIcon /> : <SaveIcon />}
//        </Fab>

//        {loading && (
//         <CircularProgress
//          size={45}
//          sx={{
//           color: green[500],
//           position: 'absolute',
//           top: -6,
//           left: -6,
//           zIndex: 1,
//          }}
//         />
//        )}
//       </Box>

//      </Box>
//     </div>
//    }
//   </div>
//  );
// };


