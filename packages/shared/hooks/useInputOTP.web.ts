import useHandleVerifyOTP from './useHandleVerifyOTP';
import {OTPTypesEnum} from '../types';
const CELL_COUNT = 6;

const useInputOTP = ({
  authSeq,
  type,
  newPassword,
  currentPassword,
  value,
}: {
  authSeq: string;
  type: OTPTypesEnum;
  newPassword?: string;
  currentPassword?: string;
  value: string;
  setValue: (value: string) => void;
}) => {
  useHandleVerifyOTP({
    value,
    maxLengthOTP: CELL_COUNT,
    type,
    authSeq,
    newPassword,
    currentPassword,
  });

  return {
    CELL_COUNT,
  };
};
export default useInputOTP;
