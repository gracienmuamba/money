import React from 'react';
import moment from 'moment';
import { db } from '../../../firebase';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import Media from 'react-media';
import './Quote.css';
import secureLocalStorage from "react-secure-storage";


// View Quote Component 
export default function ReturnQuoTe() {
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
 <div className='qte-wallet-money'><View /></div>
);
export const ScreenSmall = () => (
 <div className='qte-wallet-money'><View /></div>
);

export const View = () => {

 let pushDocs = new Array();
 const [state, setState] = React.useState(null);

 React.useEffect(async () => {

  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
   pushDocs.push(doc.id);
  });
  const verifier = pushDocs.some(value => value == secureLocalStorage.getItem("USER"));

  const docRef = doc(db, verifier ? "client" : "agent", secureLocalStorage.getItem("USER"));
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
   setState(docSnap.data().state)
  }

 }, []);

 return (
  <>
   {state === 'agent' ? <Commission /> : <Thrith />}
  </>
 );
}

export const Commission = () => (
 <>
  {moment().date() > 3 && <p>
   Votre commission sont disponible les trois premiers jours du mois
  </p>}
  {moment().date() <= 3 && <p>Votre compte commission disponible</p>}
 </>
);
export const Thrith = () => (
 <>
  {moment().date() > 3 && <p>
   Votre Solde épargne disponible les trois premiers jours du mois
  </p>}
  {moment().date() <= 3 && <p>Votre compte épargne disponible</p>}
 </>
);