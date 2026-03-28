const QRCode = require('qrcode');
const { customAlphabet } = require('nanoid');

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

function generatePublicCode() {
  return `pet_${nanoid()}`;
}

function buildPublicPetUrl(publicCode) {
  const baseUrl =
    process.env.PET_PUBLIC_BASE_URL ||
    process.env.FRONTEND_URL ||
    'https://pawtal-frontend.vercel.app/';

  return `${baseUrl.replace(/\/$/, '')}/pet/${publicCode}`;
}

async function generatePetQrBuffer(publicUrl) {
  return QRCode.toBuffer(publicUrl, {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: 500,
    type: 'png'
  });
}

module.exports = {
  generatePublicCode,
  buildPublicPetUrl,
  generatePetQrBuffer
};