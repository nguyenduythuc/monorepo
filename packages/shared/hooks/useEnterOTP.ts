import {useResendOTPMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useEffect, useState} from 'react';
import {API_SUCCESS_MESSAGE} from '@lfvn-customer/shared/utils/constants';
import {handleResponseOTPGenerateAPI} from '@lfvn-customer/shared/utils/handleResponseAPI';
import {Keyboard} from 'react-native';
import useShowToast from './useShowToast';
import useTranslations from './useTranslations';
import {useConfigRouting} from './routing';
import {OTPTypesEnum} from '@lfvn-customer/shared/types';
import {ErrorResponseProps} from '@lfvn-customer/shared/types/services';

const CELL_COUNT = 6;
const useEnterOTP = ({
  authSeq,
  phoneNumber,
  identityNumber,
}: {
  authSeq: string;
  phoneNumber: string;
  identityNumber: string;
  type: OTPTypesEnum;
}) => {
  const t = useTranslations();
  const [resendOTP, {error}] = useResendOTPMutation();
  const {handleShowToast, showCommonErrorToast} = useShowToast();
  const {goBack} = useConfigRouting();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [counter, setCounter] = useState(180); // Đếm ngược từ 180 giây (3 phút)
  const [isCounting, setIsCounting] = useState(true);
  const [msgRequestError, setMsgRequestError] = useState('');

  useEffect(() => {
    if (error) {
      try {
        const data = (error as ErrorResponseProps)?.data;
        const errorCode = JSON.parse(data.detail).code;
        const responseCode = handleResponseOTPGenerateAPI(errorCode);
        if (
          responseCode.msg !== API_SUCCESS_MESSAGE &&
          responseCode.type === 'toast'
        ) {
          handleShowToast({
            msg: t(responseCode.msg),
            type: 'error',
          });
        }
      } catch {
        // handle cannot parse error
        showCommonErrorToast();
      }
    }
  }, [error]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCounting && counter > 0) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    } else if (counter === 0) {
      setIsCounting(false);
    }
    return () => clearTimeout(timer);
  }, [counter, isCounting]);

  const onPressResendOTP = async () => {
    Keyboard.dismiss();
    const result = await resendOTP({
      phoneNumber,
      identityNumber,
      authSeq,
      type: 'AUTH',
    });
    if (result.data) {
      setIsModalVisible(true);
      setCounter(180);
      setIsCounting(true);
      setMsgRequestError('');
    }
  };

  const onPressGoBack = () => {
    goBack();
  };

  return {
    onPressGoBack,
    onPressResendOTP,
    counter,
    isCounting,
    CELL_COUNT,
    isModalVisible,
    setIsModalVisible,
    msgRequestError,
  };
};

export default useEnterOTP;
