import React from 'react';
import './Count.css';
import ReturnIMA from './IMA';

// Viw Count Component
export default function ReturnCounT(props) {
 return (
  <div className='wrp-flex-count'>

   <div className='wrp-flex-box-count'>
    <ReturnIMA IMA={props.IMA} />
    <p style={{ color: props.Colors && '#dee2e6' }}>{props.Text}</p>

   </div>
  </div>
 );
};