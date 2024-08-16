const useValidations = () => {
  const validateStringLengthFrom8To15Characters = (str: string) => {
    return str.length >= 8 && str.length <= 15;
  };

  const validateStringIncludeUpperCaseAndLowerCase = (str: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])/;
    return regex.test(str);
  };

  const validateStringInlcudeNumberAndSpecialCharacter = (str: string) => {
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])/;
    return regex.test(str);
  };

  return {
    validateStringLengthFrom8To15Characters,
    validateStringIncludeUpperCaseAndLowerCase,
    validateStringInlcudeNumberAndSpecialCharacter,
  };
};

export default useValidations;
