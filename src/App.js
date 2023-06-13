import React from 'react';
import './Loading.css';
import Hm from './Hm/Main';
// import anime from "animejs/lib/anime.es.js";
import axios from 'axios'

function App() {


 const getUserIP = async () => {
  const ip = await axios.get('https://ipapi.co/json');
  window.console.log(ip.data.ip);
  window.console.log(ip.data.org);
 };


 React.useEffect(() => { getUserIP() }, []);
 return (
  <Hm />
 );
};

// Export component Main
export default App