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
  value,
  setValue,
}: {
  authSeq: string;
  type: OTPTypesEnum;
  newPassword?: string;
  currentPassword?: string;
  value: string;
  setValue: (value: string) => void;
}) => {
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
    ref,
    props,
    getCellOnLayoutHandler,
    CELL_COUNT,
  };
};
export default useInputOTP;
