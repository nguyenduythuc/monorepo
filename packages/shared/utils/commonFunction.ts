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
  return storage.getString(key);
};
