import {useState} from 'react';
import useHandleVerifyOTP from './useHandleVerifyOTP';
import {OTPTypesEnum} from '../types';
const CELL_COUNT = 6;

const useInputOTP = ({
  authSeq,
  type,
  newPassword,
  currentPassword,
}: {
  authSeq: string;
  type: OTPTypesEnum;
  newPassword?: string;
  currentPassword?: string;
}) => {
  const [value, setValue] = useState('');

  useHandleVerifyOTP({
    value,
    maxLengthOTP: CELL_COUNT,
    type,
    authSeq,
    newPassword,
    currentPassword,
  });

  return {
    value,
    setValue,
    CELL_COUNT,
  };
};
export default useInputOTP;
