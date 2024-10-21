import {PreCheckDataMetadataProps} from '@lfvn-customer/shared/types/services/loanTypes';
import RNFS from 'react-native-fs';

export const maskPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/(?<=.{2}).(?=.*.{3})/g, '*');
};

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds,
  ).padStart(2, '0')}`;
};

export const checkErrorPrecheckResult = (result: PreCheckDataMetadataProps) => {
  const {metadata} = result.data;
  return (
    result.data.errorMsg !== 'Success' ||
    !metadata?.duplicateResult ||
    metadata.duplicateResult === 'fail' ||
    !metadata?.blacklistResult ||
    metadata?.blacklistResult === 'fail' ||
    !metadata?.s37Result ||
    metadata?.s37Result === 'fail'
  );
};

export const convertNumberToCurrency = (number?: string) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(parseInt(number || '') ?? 0);
};

export const base64ToBlob = (
  base64: string,
  mimeType: string = 'image/jpeg',
) => {
  const prefix = `data:${mimeType};base64,`;
  const validBase64 = base64.startsWith(prefix) ? base64 : `${prefix}${base64}`;

  // use fetch to convert base64 to blob
  return fetch(validBase64).then(res => res.blob());
};

export const saveEKYCImageBase64ToFile = async (
  base64Data: string,
  fileName: string,
) => {
  try {
    const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    const prefix = `data:image/jpeg;base64,`;
    const validBase64 = base64Data.startsWith(prefix)
      ? base64Data
      : `${prefix}${base64Data}`;

    // save base64 to file
    await RNFS.writeFile(
      path,
      validBase64.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    return path;
  } catch (error) {
    console.error('Error saving file: ', error);
  }
};

export const removeFileAfterUpload = (filePath: string) => {
  RNFS.unlink(filePath);
};
