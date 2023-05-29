import React from 'react';
import './Devise.css';

// view images devise component
export default function ReturnIMA(props) {
 return (
  <div className='pret-dash-img-devise'>
   <img src={props.IMA} />
  </div>
 );
};