import {useState} from 'react';
import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
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

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
    ref,
    props,
    getCellOnLayoutHandler,
    CELL_COUNT,
  };
};
export default useInputOTP;
