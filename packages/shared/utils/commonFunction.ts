import { mmkvStorage, storage } from './storage';

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

  return { numberMoneyFormat, currencySymbolVND };
};

export const saveVerifyAccountInfo = (key: string, value: string | object) => {
  mmkvStorage.setItem(key, value);
};

export const getVerifyAccountInfo = (key: string) => {
  return storage.getString(key) || '';
};

export const convertDateToISO = (dateString: string) => {
  const [day, month, year] = dateString.split('/').map(Number);
  const date = new Date(year, month - 1, day + 1);
  const isoDate = date.toISOString();
  console.log('isoDate', isoDate);
  return isoDate;
};

export const formatGenderInfo = (gender: string | undefined, type: 'display' | 'update') => {
  if (type === 'display') {
    return gender === 'Nam' || 'MALE' ? 'Nam' : 'Nữ'
  } else {
    return gender === 'Nam' || 'MALE' ? 'MALE' : 'FEMALE'
  }
}

export const formatNationalityInfo = (nationality: string) => {
  const convertNationality: { [key: string]: string } = {
    'Việt Nam': 'VIETNAMESE',
    '': 'UNKNOWN'
  }
  return convertNationality[nationality] || 'UNKNOWN'
}
