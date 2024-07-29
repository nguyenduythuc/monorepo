import {API_SUCCESS_MESSAGE} from './constants';

export const handleResponseOTPGenerateAPI = (code?: string) => {
  switch (code) {
    case '00':
      return API_SUCCESS_MESSAGE;
    case '80':
      return 'OTPStatusCode.80';
    case '82':
      return 'OTPStatusCode.82';
    case '83':
      return 'OTPStatusCode.83';
    case '84':
      return 'OTPStatusCode.84';
    case '85':
      return 'OTPStatusCode.85';
    case '86':
      return 'OTPStatusCode.86';
    case '87':
      return 'OTPStatusCode.87';
    case '88':
      return 'OTPStatusCode.88';
    case '89':
      return 'OTPStatusCode.89';
    default:
      return '';
  }
};
