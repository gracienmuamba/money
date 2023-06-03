import { Routes, Route } from 'react-router-dom';
import App from './App';
import SiGn from './Sign/Main';

import Region from './Register/Region/Main';
import RegisterPhone from './Register/Phone/Main';
import SignInRegister from './Register/SignIn/Main';


import RegisterSuccess from './Register/RegisterSuccess/Main';
import SAve from './Register/Save/Main';


import RegisteR from './Register/Main';
import DashEd from './Dashed/Main';
import ProFil from './Profil/Main';


import WithdrAw from './Withdraw/Main';
import FrAn from './FC/Main';
import ReturnUsd from './USD/Main';
import ValidExchAnge from './ValidExFran/Main';
import ExchAnge from './ExFran/Main';
import RetuRnExUSd from './ExUSd/Main';



import WithdrawSuccessCDF from './WellFC/Main';
import WithdrawSuccessUSD from './WellUSD/Main';
import WellSuccessBlocked from './WellBlocked/Main';
import WellSuccessUsdBlocked from './WellBlockedUsd/Main';

import SendSimple from './Pin/Fc/Simple/Main';
import SendUsdSimple from './Pin/Usd/Simple/Main';
import SendBlocked from './Pin/Fc/Blocked/Main';
import SendUSDBlocked from './Pin/Usd/Blocked/Main';

import PinNow from './Profil/Pin/Now/Main';
import PinUpgRAde from './Profil/Pin/Upgrade/Main';
import SuccessPin from './Profil/Pin/Success/Main';
import CodeNow from './Profil/Code/Now/Main';
import CodeUpgRAde from './Profil/Code/Upgrade/Main';
import SuccessCode from './Profil/Code/Success/Main';

import BroKers from './Brokers/Main';
import HmUniTe from './Brokers/Unite/Main';
import BuyBroKer from './Brokers/Number/Main';
import HmSelecT from './Brokers/Select/Main';
import PriXBroKer from './Brokers/Prix/Main';
import UniteBuy from './Brokers/Buy/Main';
import FiatLisT from './Brokers/Nav/Main';
import EditFiAt from './Brokers/Edit/List/Main';
import CmdBroKers from './Brokers/Cmd/Main';

import BroKerThanK from './Brokers/Thank/Main';
import PinBroKer from './Brokers/Pin/Now/Main';
import SAveBroKers from './Brokers/Save/Main';
import SavingBroKers from './Brokers/Saving/Main';
import FiAt from './Brokers/Fiat/Main';
import WAlleT from './Wallet/Main';
import WellFiAt from './Brokers/WellFiat/Main';
import WellFiAtUpdate from './Brokers/WellUpgradeFiat/Main';

import PreT from './Pret/Main';
import PretViEw from './Pret/PretView/Main';
import Pretdraw from './Pret/Withdraw/Main';
import RegisterPreT from './Pret/Form/Main';
import RegisterFranPreT from './Pret/Fran/Form/Main';
import SendPreT from './Pret/Send/Main';
import AsKed from './Pret/Costs/Asked/Main';
import AsKedFrAn from './Pret/Costs/AskedFran/Main';
import DashPreT from './Pret/Dash/Main';
import Devise from './Pret/Devise/Main';
import PretFranPret from './Pret/Pin/Now/Main';
import PretDollarPret from './Pret/Usd/Pin/Now/Main';
import MeThod from './Pret/Method/Main';
import ReimBurse from './Pret/Reimburse/Cmd/Main';


import StocK from './Stock/Main';
import StocKBuy from './Stock/Buy/Main';
import StocKDevise from './Stock/Devise/Main';
import PinStocK from './Stock/Pin/Now/Main';
import StocKThanK from './Stock/Thank/Main';

import TonTine from './Tontine/Main';


import FormTontine from './Tontine/Form/Main';
import DeviseTontine from './Tontine/Devise/Main';
import CuRRencyUsd from './Tontine/Currency/Asked/Main';
import CuRRencyCdf from './Tontine/Currency/AskedFran/Main';
import InFoTontine from './Tontine/Info/Main';
import TonTinePin from './Tontine/Pin/Now/Main';
import WellTonTine from './Tontine/Well/Main';
import GrOupTontine from './Tontine/Group/Main';
import LisTgrOup from './Tontine/ListGroup/Cmd/Main';
import LisTChild from './Tontine/ListChild/Main';
import ChildGroup from './Tontine/Child/Main';
import ChildOverView from './Tontine/Overview/Main';
import BudGeT from './Tontine/Budget/Main';
import BudGeTPin from './Tontine/BudgetPin/Main';
import BudGeTPinAll from './Tontine/BudgetAllPin/Main';

import StocKCMD from './Command/Main';
import ListcmdStocK from './Command/List/Main';


// URI viewer component 
export default function ReturRnURI() {
 return (
  <Routes>
   <Route path='/' element={<App />} />
   <Route path='/sign' element={<SiGn />} />
   <Route path='/register/region' element={<Region />} />

   <Route path='/register/phone' element={<RegisterPhone />} />
   <Route path='/register/signin' element={<SignInRegister />} />
   <Route path='/register/success' element={<RegisterSuccess />} />

   <Route path='register' element={<RegisteR />} />
   <Route path='/register-save' element={<SAve />} />
   <Route path='/profil' element={<ProFil />} />
   <Route path='/dash' element={<DashEd />} />
   <Route path='/send-money' element={<WithdrAw />} />
   <Route path='/fran' element={<FrAn />} />
   <Route path='/usd' element={<ReturnUsd />} />
   <Route path='/valid-fc' element={<ValidExchAnge />} />


   <Route path='/exchange' element={<ExchAnge />} />
   <Route path='/exchange-usd' element={<RetuRnExUSd />} />
   <Route path='/send-fc' element={<SendSimple />} />
   <Route path='/send-usd' element={<SendUsdSimple />} />
   <Route path='/send-success' element={<WithdrawSuccessCDF />} />
   <Route path='/send-success-usd' element={<WithdrawSuccessUSD />} />
   <Route path='/send-success-blocked' element={<WellSuccessBlocked />} />
   <Route path='/send-success-blocked-usd' element={<WellSuccessUsdBlocked />} />

   <Route path='/send-blocked' element={<SendBlocked />} />
   <Route path='/send-blocked-usd' element={<SendUSDBlocked />} />


   <Route path='/pin/now' element={<PinNow />} />
   <Route path='/pin/update' element={<PinUpgRAde />} />
   <Route path='/pin/success' element={<SuccessPin />} />

   <Route path='/code/now' element={<CodeNow />} />
   <Route path='/code/update' element={<CodeUpgRAde />} />
   <Route path='/code/success' element={<SuccessCode />} />

   <Route path='/brokers' element={<BroKers />} />
   <Route path='/brokers/unite' element={<HmUniTe />} />
   <Route path='/brokers/unite/number' element={<BuyBroKer />} />
   <Route path='/brokers/unite/select' element={<HmSelecT />} />
   <Route path='/brokers/unite/prix' element={<PriXBroKer />} />
   <Route path='/brokers/unite/buy' element={<UniteBuy />} />
   <Route path='/brokers/sign/fiat/list' element={<FiatLisT />} />
   <Route path='/brokers/sign/fiat/list/edit' element={<EditFiAt />} />
   <Route path='/brokers/unite/cmd' element={<CmdBroKers />} />

   <Route path='/brokers/unite/thank' element={<BroKerThanK />} />
   <Route path='/brokers/unite/pin' element={<PinBroKer />} />
   <Route path='/brokers/save' element={<SAveBroKers />} />
   <Route path='/brokers/saving' element={<SavingBroKers />} />
   <Route path='/brokers/sign/fiat' element={<FiAt />} />
   <Route path='/wallet' element={<WAlleT />} />
   <Route path='/save/fiat/success' element={<WellFiAt />} />
   <Route path='/save/fiat/update/success' element={<WellFiAtUpdate />} />


   <Route path='/pret' element={<PreT />} />
   <Route path='/pret/register' element={<RegisterPreT />} />
   <Route path='/pret/fran/register' element={<RegisterFranPreT />} />
   <Route path='/pret/send' element={<SendPreT />} />

   <Route path='/pret/costs/asked/usd' element={<AsKed />} />
   <Route path='/pret/costs/asked/cdf' element={<AsKedFrAn />} />
   <Route path='/pret/costs/devise/asked' element={<Pretdraw />} />
   <Route path='/pret/dash' element={<DashPreT />} />
   <Route path='/pret/devise/' element={<Devise />} />
   <Route path='/pret/pin/fran' element={<PretFranPret />} />
   <Route path='/pret/pin/dollar' element={<PretDollarPret />} />
   <Route path='/pret/view' element={<PretViEw />} />
   <Route path='/pret/method' element={<MeThod />} />
   <Route path='/pret/reimburse' element={<ReimBurse />} />


   <Route path='/stock/fiat' element={<StocK />} />
   <Route path='/stock/buy' element={<StocKBuy />} />
   <Route path='/stock/devise' element={<StocKDevise />} />
   <Route path='/stock/pin' element={<PinStocK />} />
   <Route path='/stock/thank' element={<StocKThanK />} />


   <Route path='/tontine' element={<TonTine />} />
   <Route path='/tontine/form' element={<FormTontine />} />
   <Route path='/tontine/form/currency' element={<DeviseTontine />} />
   <Route path='/tontine/form/currency/usd' element={<CuRRencyUsd />} />
   <Route path='/tontine/form/currency/cdf' element={<CuRRencyCdf />} />
   <Route path='/tontine/form/info' element={<InFoTontine />} />
   <Route path='/tontine/form/pin' element={<TonTinePin />} />
   <Route path='/tontine/form/well' element={<WellTonTine />} />
   <Route path='/tontine/group' element={<GrOupTontine />} />

   <Route path='/tontine/group/child' element={<ChildGroup />} />
   <Route path='/tontine/group/overview' element={<ChildOverView />} />
   <Route path='/tontine/list/group' element={<LisTgrOup />} />
   <Route path='/tontine/list/group/child' element={<LisTChild />} />
   <Route path='/tontine/list/group/child/budget' element={<BudGeT />} />
   <Route path='/tontine/list/group/child/budget/pin' element={<BudGeTPin />} />
   <Route path='/tontine/list/group/child/budget/pin/all' element={<BudGeTPinAll />} />

   <Route path='/command/agent' element={<StocKCMD />} />
   <Route path='/command/agent/list' element={<ListcmdStocK />} />


   <Route path='*' element={<App />} />
  </Routes>
 );
};

