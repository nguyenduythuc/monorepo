export const validateOnlyNumberFloat = (str: string) => {
  const regex = /^(?!^\.)\d*(?:\.\d+)?$/;
  return regex.test(str);
};
