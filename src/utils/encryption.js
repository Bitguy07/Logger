import CryptoJS from 'crypto-js';

const secret_key = import.meta.env.VITE_SECRET_KEY;

 // Use a fixed 16-byte IV (for AES-128/CBC)
const IV = CryptoJS.enc.Utf8.parse('1234567890123456');

export const encryptOwnerData = (data) => {
  // data is an object, e.g. { ownerId: 2, email: 'admin@example.com' }
  const dataStr = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(dataStr, CryptoJS.enc.Utf8.parse(secret_key), {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

export const decryptOwnerData = (encryptedData) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Utf8.parse(secret_key), {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};