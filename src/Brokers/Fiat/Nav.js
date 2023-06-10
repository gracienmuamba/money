import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import { HiArrowLeft } from 'react-icons/hi';
import Fab from '@mui/material/Fab';
import './Nav.css';


export function BacK() {

 const navigation = useNavigate();
 return (
  <div className='wrp-back-brokers'>
   <div onClick={() => navigation('/dash')} className='wrp-back-box-brokers'>
    <HiArrowLeft size={'1.6em'} color={'grey'} />
   </div>
  </div>
 );
}
export function Edit() {

 const navigation = useNavigate();
 const handlepath = (event) => {
  event.preventDefault();
  window.localStorage.setItem('@%^**fiatpath*>edit', JSON.stringify(true));
  navigation('/brokers/sign/fiat/list');
 }

 return (
  <div className='wrp-back-brokers'>
   <div onClick={handlepath} className='wrp-back-box-brokers'>

    <Fab aria-label="edit" color='primary'>
     <CreateIcon />
    </Fab>

   </div>
  </div>
 );
}

// NavBar component view 
export default function ReturnNavBaR() {
 return (
  <div className='navbar-top-broker-fiat'>
   <nav>
    <BacK />
    <Edit />
   </nav>
  </div>
 );
};

