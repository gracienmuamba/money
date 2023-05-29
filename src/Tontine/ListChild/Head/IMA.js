import React from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';


const View = (props) => {

 const [profil, setProfil] = React.useState(null);
 React.useEffect(async () => {
  await onSnapshot(doc(db, 'client', props.docProfil), (doc) => {
   setProfil(doc.data().profile);
  });

 }, []);

 return (
  <div className='profil-tontine-navs'>
   <img src={profil} />
  </div>
 );
};

export default View;