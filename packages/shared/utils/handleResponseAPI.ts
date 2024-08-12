import {API_SUCCESS_MESSAGE} from './constants';

export const handleResponseOTPGenerateAPI: {
  (code?: string): {
    msg: string;
    type: 'toast' | 'modal' | 'none';
  };
} = (code?: string) => {
  switch (code) {
    case 'OTP.00':
      return {
        msg: API_SUCCESS_MESSAGE,
        type: 'none',
      };
    case 'OTP.80':
      return {
        msg: 'OTPStatusCode.80',
        type: 'toast',
      };
    case 'OTP.82':
      return {
        msg: 'OTPStatusCode.82',
        type: 'toast',
      };
    case 'OTP.83':
      return {
        msg: 'OTPStatusCode.83',
        type: 'toast',
      };
    case 'OTP.84':
      return {
        msg: 'OTPStatusCode.84',
        type: 'toast',
      };
    case 'OTP.85':
      return {
        msg: 'OTPStatusCode.85',
        type: 'toast',
      };
    case 'OTP.86':
      return {
        msg: 'OTPStatusCode.86',
        type: 'toast',
      };
    case 'OTP.87':
      return {
        msg: 'OTPStatusCode.87',
        type: 'toast',
      };
    case 'OTP.88':
      return {
        msg: 'OTPStatusCode.88',
        type: 'toast',
      };
    case 'OTP.89':
      return {
        msg: 'OTPStatusCode.89',
        type: 'toast',
      };
    default:
      return {
        msg: '',
        type: 'none',
      };
  }
};
