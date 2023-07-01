import QRCode from "react-qr-code";
import './Qrcode.css';
import secureLocalStorage from "react-secure-storage";

// Title Return Compoennt
export default function ReturnQRcode() {

 const qrcodeId = secureLocalStorage.getItem("USER") + JSON.parse(window.localStorage.getItem('@solde!#!')) + JSON.parse(window.localStorage.getItem('@dateª©#&&++#'))
 return (
  <div className='wrp-logo-print-tickets-qrcode'>

   <QRCode
    size={95}
    value={`${qrcodeId}`}

   />
  </div>
 );
};