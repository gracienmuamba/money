import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import './Money.css';
import ReturnCDF from './CDF';
import ReturnUSD from './USD';


const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);


function ReturnMoney() {
 return (
  <div className='wallet-keyboard-view'>
   <BindKeyboardSwipeableViews>
    <ReturnCDF />
    <ReturnUSD />
   </BindKeyboardSwipeableViews>
  </div>
 );
}

export default ReturnMoney;
