import {useResendOTPMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useEffect, useState} from 'react';
import {API_SUCCESS_MESSAGE} from '@lfvn-customer/shared/utils/constants';
import {handleResponseOTPGenerateAPI} from '@lfvn-customer/shared/utils/handleResponseAPI';
import {Keyboard} from 'react-native';
import useShowToast from './useShowToast';
import useTranslations from './useTranslations';
import {useConfigRouting} from './routing';

const CELL_COUNT = 6;
const useEnterOTP = ({
  authSeq,
  phoneNumber,
  identityNumber,
  type,
}: {
  authSeq: string;
  phoneNumber: string;
  identityNumber: string;
  type: string;
}) => {
  const t = useTranslations();
  const [resendOTP, {isError: isResendError}] = useResendOTPMutation();
  const {handleShowToast} = useShowToast();
  const {goBack} = useConfigRouting();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [counter, setCounter] = useState(180); // Đếm ngược từ 180 giây (3 phút)
  const [isCounting, setIsCounting] = useState(true);
  const [msgRequestError, setMsgRequestError] = useState('');

  useEffect(() => {
    if (isResendError) {
      handleShowToast({
        msg: t('EnterOTP.msgResendFail'),
        type: 'error',
      });
    }
  }, [isResendError]);

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
    const responseCode = handleResponseOTPGenerateAPI(result.data?.code);
    if (responseCode.msg !== API_SUCCESS_MESSAGE) {
      if (responseCode.type === 'toast') {
        handleShowToast({
          msg: t(responseCode.msg),
          type: 'error',
        });
      }
    } else {
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
