import React from 'react';
import './Balance.css';
import Media from 'react-media';
import { db } from '../../../../firebase';
import { doc, onSnapshot } from "firebase/firestore";
import { TweenMax, Expo } from 'gsap';
import moment from 'moment';
import currency from 'currency.js';


// Prix HeAd 
export default function ReturnBalance() {
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
 <div className='wrp-main-prix-pret'>
  <View />
 </div>
);
export const ScreenSmall = () => (
 <div className='wrp-main-prix-pret-sm'>
  <View />
 </div>
);
export const View = () => {

 const [cdf, setCdf] = React.useState(0.00);
 const [usd, setUsd] = React.useState(0.00);

 const [time, setTime] = React.useState(new Date());
 const [open, setOpen] = React.useState(false);


 React.useEffect(async () => {

  try {
   await onSnapshot(doc(db, "pret", JSON.parse(window.localStorage.getItem('USER'))), (doc) => {

    setCdf(doc.data().pretcdf);
    setUsd(doc.data().pretusd);
    setTime(doc.data().date);
   });
  } catch {
   window.console.log(`Erreur`);
  }

 }, []);

 React.useEffect(() => {
  TweenMax.from('.Anima-Top', 1, { delay: 5.2, opacity: 0, y: 10, ease: Expo.easeIn });
  TweenMax.from('.Anima-Bottom', 1, { delay: 7.5, opacity: 0, y: -10, ease: Expo.easeIn });
 }, []);

 var now = moment(); //todays date
 let year = moment(time).get('year');
 let months = moment(time).get('month');
 let days = moment(time).get('date');
 var end = moment([year, months, days]); // another date

 var duration = moment.duration(now.diff(end));
 var day = duration.asDays();

 let pretCdf = cdf;
 let modulecdf = 0;
 let pourcentage = JSON.parse(window.localStorage.getItem('%%pret-*%'));

 for (let index = 0; index <= parseInt(day); index++) {

  if (index === 0) {
   continue;

  } else {
   modulecdf = (pretCdf * pourcentage / 100);
   pretCdf += modulecdf;

  }

 };


 let yearusd = moment(time).get('year');
 let monthsusd = moment(time).get('month');
 let daysusd = moment(time).get('date');
 var end = moment([yearusd, monthsusd, daysusd]); // another date

 var duration = moment.duration(now.diff(end));
 var dayusd = duration.asDays();

 let pretUsd = usd;
 let moduleusd = 0;

 for (let index = 0; index <= parseInt(dayusd); index++) {

  if (index === 0) {
   continue;

  } else {
   moduleusd = (pretUsd * pourcentage / 100);
   pretUsd += moduleusd;

  }

 };
 window.setTimeout(() => {
  setOpen(true);
 }, 3000);


 var euro = value => currency(value, { separator: ' ', decimal: '.', symbol: '' });

 return (
  <>
   {usd > 0 &&
    <div className='wrp-graph-head-pret'>
     {/* <span>{(pretUsd).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ')} USD</span> */}
     <span>{euro(pretUsd).format()} USD</span>
    </div>
   }

   {cdf > 0 &&
    <div className='wrp-graph-head-pret'>
     {/* <span>{(pretCdf).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ')} CDF</span> */}
     <span>{euro(pretCdf).format()} CDF</span>
    </div>
   }
  </>
 )
}
