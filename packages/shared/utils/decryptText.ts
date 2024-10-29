import CryptoJS from 'crypto-js';

// Encryption process
export const decryptAES = (cipherText: any, passpharse: any) => {
  if (!cipherText || !passpharse) {
    return null;
  }
  try {
    const parsedBase64Key = CryptoJS.enc.Base64.parse(passpharse);

    // Decryption process
    const decryptedData = CryptoJS.AES.decrypt(cipherText, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    // this is the decrypted data as a string
    return decryptedData.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.log('err', err);
    return null;
  }
};
