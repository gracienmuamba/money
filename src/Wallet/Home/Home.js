import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import SlideLeft from './Slide1/Main';
import SlideRight from './Slide2/Main';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

const styles = {
 slide: {
  minHeight: '100vh',
  position: 'relative'
 },
 slide1: {
  backgroundColor: 'transparent',
 },
 side2: {
  backgroundColor: '#B3DC4A',
 },
};

function DemoKeyboard() {
 return (
  <BindKeyboardSwipeableViews>
   <div style={Object.assign({}, styles.slide, styles.slide1)}>
    <SlideLeft />
   </div>
   <div style={Object.assign({}, styles.slide, styles.slide2)}>
    <SlideRight />
   </div>
  </BindKeyboardSwipeableViews>
 );
}

export default DemoKeyboard;
