import React, { PureComponent } from 'react';
import './Graph.css';
import { BarChart, Bar, XAxis } from 'recharts';


// Graph Return Component
export default function ReturnPretStatistic() {

 const data = [
  {
   "name": "P.O",
   "pv": 100
  },
  {
   "name": "P.R",
   "pv": 10
  },
  {
   "name": "P.D",
   "pv": 40
  },

 ];

 return (
  <div className='flex-graphi-pret'>
   <BarChart width={260} height={150} data={data}>

    <XAxis dataKey="name" stroke="#fff" tick={{ fontFamily: 'Alata', }} />

    <Bar dataKey="pv" fill="#e0e2db" />
   </BarChart>
  </div>
 );
}
