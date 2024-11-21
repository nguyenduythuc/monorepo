import {mmkvStorage, storage} from './storage';

export const formatterVND = (value: number) => {
  const intl = new Intl.NumberFormat('vn-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return intl.format(value);
};

export const formatNewAmount = (value: number) => {
  let numberMoneyFormat = formatterVND(value);

  const currencySymbolVND = numberMoneyFormat.slice(0, 1);

  numberMoneyFormat = numberMoneyFormat.replace(currencySymbolVND, '');

  return {numberMoneyFormat, currencySymbolVND};
};

export const saveVerifyAccountInfo = (key: string, value: string | object) => {
  mmkvStorage.setItem(key, value);
};

export const getVerifyAccountInfo = (key: string) => {
  return storage.getString(key) || '';
};

export const convertDateToISO = (dateString: string) => {
  // format date is DD/MM/YYYY
  const [day, month, year] = dateString.split('/').map(Number);
  const date = new Date(year, month - 1, day + 1);
  return date.toISOString();
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, so add 1
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatGenderInfo = (
  gender: string | undefined,
  type: 'display' | 'update',
) => {
  if (type === 'display') {
    return gender?.toLowerCase() === 'nam' || gender?.toLowerCase() == 'male'
      ? 'Nam'
      : 'Nữ';
  } else {
    return gender?.toLowerCase() === 'nam' || gender?.toLowerCase() == 'male'
      ? 'MALE'
      : 'FEMALE';
  }
};

export const formatNationalityInfo = (nationality: string) => {
  const convertNationality: {[key: string]: string} = {
    VIETNAMESE: 'Việt Nam',
    VN: 'Việt Nam',
    '': 'UNKNOWN',
  };
  return convertNationality[nationality] || 'Việt Nam';
};

export const formatMaritalStatus = (status: string) => {
  const convertMaritalStatus: {[key: string]: string} = {
    married: 'Đã kết hôn',
    single: 'Độc thân',
    divorced: 'Ly hôn',
  };
  return convertMaritalStatus[status] || '';
};

export const DISABLED = true;

export const generateQuestionValidateStatusList = (
  totalQuestion: number,
): {[key: number]: boolean} => {
  const dataResult: {[key: number]: boolean} = {};

  for (let i = 0; i < totalQuestion; i++) {
    dataResult[i] = DISABLED;
  }

  return dataResult;
};
