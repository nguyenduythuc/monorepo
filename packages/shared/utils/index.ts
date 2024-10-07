import { PreCheckDataMetadataProps } from '@lfvn-customer/shared/types/services/loanTypes';

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
  const { metadata } = result.data;
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
