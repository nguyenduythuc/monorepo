import CryptoJS from 'crypto-js';

// Encryption process
export const decryptAES = (cipherText: any, passpharse: any) => {
  try {
    var parsedBase64Key = CryptoJS.enc.Base64.parse(passpharse);
    var encryptedData = null;
    var plaintText = 'Please encrypt this message!';

    // this is Base64-encoded encrypted data
    encryptedData = CryptoJS.AES.encrypt(plaintText, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Decryption process
    var decryptedData = CryptoJS.AES.decrypt(cipherText, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    // this is the decrypted data as a string
    var decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);
    return decryptedText;
  } catch (err) {
    console.log('err', err);
    return null;
  }
};
