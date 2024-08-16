export const REGEX = {
  email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/, // password must include numbers, uppercase, lowercase and special characters
  phone: /^0\d{9}$/,
  taxCode: /^(?:\d{10}|\d{13})?$/, // not require but if input need 10 or 13 number
  accountNumer: /^[a-zA-Z0-9]{1,49}$/,
  onlyNumber: /^\d+$/,
  address: /^[A-Za-z0-9#,./\-\s]+$/,
  iSODate: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
  dateMDYRegex: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/,
  dateDMYRegex: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/,
};

export const validateOnlyNumberFloat = (str: string) => {
  const regex = /^(?!^\.)\d*(?:\.\d+)?$/;
  return regex.test(str);
};

export const validateStringLengthFrom8To15Characters = (str: string) => {
  return str.length >= 8 && str.length <= 15;
};

export const validateStringIncludeUpperCaseAndLowerCase = (str: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])/;
  return regex.test(str);
};

export const validateStringInlcudeNumberAndSpecialCharacter = (str: string) => {
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])/;
  return regex.test(str);
};

export const validatePhoneNumber = (str: string) => {
  const phoneLength = str.startsWith('+') ? 11 : 10;
  const regex = new RegExp(`^\\+?\\d{${phoneLength},}$`);
  return regex.test(str);
};

export const validateIdentityNumber = (str: string) => {
  const regex = /^\d{9,12}$/;
  return regex.test(str);
};
