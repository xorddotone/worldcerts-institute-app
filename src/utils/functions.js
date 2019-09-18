import QRCode from 'qrcode';
import download from 'downloadjs';

export const generateQrCodes = async (certificates) => {
    try {
      for (let i = 0; i < certificates.length; i++) {
        let qr = await QRCode.toDataURL('https://encert.app/certificate?' + certificates[i]._id);
        await download(qr, `${certificates[i].receiver_name} , team ${certificates[i].team_name}.png`);
      }
    } catch (e) {
      console.log(e);
    }
  };