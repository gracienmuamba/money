import ReturnBox from './Box';
import Divider from '@mui/material/Divider';
import ReturnSearch from './Search';

// ReturnNavStocK stock
export default function ReturnNavStocK() {
 return (
  <div className='nav-stock'>
   <ReturnBox />
   <Divider />
   <ReturnSearch />
  </div>
 );
};