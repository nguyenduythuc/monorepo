import {useState} from 'react';
import useHandleVerifyOTP from './useHandleVerifyOTP';
import {OTPTypesEnum} from '../types';
const CELL_COUNT = 6;

const useInputOTP = ({
  authSeq,
  type,
  newPassword,
}: {
  authSeq: string;
  type: OTPTypesEnum;
  newPassword?: string;
}) => {
  const [value, setValue] = useState('');

  useHandleVerifyOTP({
    value,
    maxLengthOTP: CELL_COUNT,
    type,
    authSeq,
    newPassword,
  });

  return {
    value,
    setValue,
    CELL_COUNT,
  };
};
export default useInputOTP;
