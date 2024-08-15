import {useState} from 'react';
import useHandleVerifyOTP from './useHandleVerifyOTP';
const CELL_COUNT = 6;

const useInputOTP = ({authSeq, type}: {authSeq: string; type: string}) => {
  const [value, setValue] = useState('');

  useHandleVerifyOTP({
    value,
    maxLengthOTP: CELL_COUNT,
    type,
    authSeq,
  });

  return {
    value,
    setValue,
    CELL_COUNT,
  };
};
export default useInputOTP;
