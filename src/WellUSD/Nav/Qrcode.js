import QRCode from "react-qr-code";

// Title Return Compoennt
export default function ReturnQRcode() {

 const qrcodeId = JSON.parse(window.localStorage.getItem('USER')) + JSON.parse(window.localStorage.getItem('@solde!#!')) + JSON.parse(window.localStorage.getItem('@dateª©#&&++#'))
 return (
  <div className='wrp-logo-print-tickets-qrcode'>

   <QRCode
    size={156}
    value={`${qrcodeId}`}

   />
  </div>
 );
};