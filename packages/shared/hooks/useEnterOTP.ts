import {useDispatch} from 'react-redux';
import {
  useResendOTPMutation,
  useVerifyOTPMutation,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useNavigation} from '@react-navigation/native';
import {EnterOTPScreenNavigationProps} from '../../mobile/src/types/paramtypes';
import {useEffect, useRef, useState} from 'react';
import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Toast from 'react-native-toast-message';
import {useTranslations} from 'use-intl';
import {
  API_SUCCESS_CODE,
  API_SUCCESS_MESSAGE,
} from '@lfvn-customer/shared/utils/constants';
import {handleResponseOTPGenerateAPI} from '@lfvn-customer/shared/utils/handleResponseAPI';
import {Keyboard} from 'react-native';

const CELL_COUNT = 6;
const useEnterOTP = ({
  authSeq,
  phoneNumber,
  identityNumber,
}: {
  authSeq: string;
  phoneNumber: string;
  identityNumber: string;
}) => {
  const t = useTranslations();
  const [verifyOTP, {isError: isVerifyError, isLoading: isVerifyLoading}] =
    useVerifyOTPMutation();
  const [resendOTP, {isError: isResendError, isLoading: isResendLoading}] =
    useResendOTPMutation();
  const dispatch = useDispatch();
  const navigation = useNavigation<EnterOTPScreenNavigationProps>();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [counter, setCounter] = useState(180); // Đếm ngược từ 180 giây (3 phút)
  const [isCounting, setIsCounting] = useState(true);
  const [msgRequestError, setMsgRequestError] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (isVerifyError) {
      Toast.show({
        type: 'error',
        text1: t('EnterOTP.msgVerifyFail'),
      });
    }
  }, [isVerifyError]);

  useEffect(() => {
    if (isResendError) {
      Toast.show({
        type: 'error',
        text1: t('EnterOTP.msgResendFail'),
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

  useEffect(() => {
    (async () => {
      if (value.length === CELL_COUNT) {
        // const result = await verifyOTP({
        //   authSeq,
        //   code: value,
        //   type: 'AUTH',
        // });
        // if (result.data?.code !== API_SUCCESS_CODE) {
        //   Toast.show({
        //     type: 'error',
        //     text1: t('EnterOTP.msgVerifyFail'),
        //   });
        // } else {
        //   const msgResponseCode = handleResponseOTPGenerateAPI(
        //     result.data?.data.code,
        //   );
        //   if (msgResponseCode !== API_SUCCESS_MESSAGE) {
        //     setMsgRequestError(t(msgResponseCode));
        //   } else {
        //     Toast.show({
        //       type: 'success',
        //       text1: 'Đăng nhập thành công',
        //     });
        //   }
        // }
        Toast.show({
          type: 'success',
          text1: 'Đăng nhập thành công',
        });
      }
    })();
  }, [value]);

  const onPressResendOTP = async () => {
    Keyboard.dismiss();
    const result = await resendOTP({
      phoneNumber,
      identityNumber,
      authSeq,
      type: 'AUTH',
    });
    if (result.data?.code !== API_SUCCESS_CODE) {
      Toast.show({
        type: 'error',
        text1: t('EnterOTP.msgResendFail'),
      });
    } else {
      const msgResponseCode = handleResponseOTPGenerateAPI(
        result.data?.data.code,
      );
      if (msgResponseCode !== API_SUCCESS_MESSAGE) {
        Toast.show({
          type: 'error',
          text1: t(msgResponseCode),
        });
      } else {
        setCounter(180); // Đặt lại bộ đếm về 180 giây (3 phút)
        setIsCounting(true);
      }
    }
  };

  const onPressGoBack = () => {
    navigation.goBack();
  };

  return {
    onPressGoBack,
    onPressResendOTP,
    value,
    setValue,
    counter,
    isCounting,
    ref,
    props,
    getCellOnLayoutHandler,
    CELL_COUNT,
    isModalVisible,
    setIsModalVisible,
    msgRequestError,
  };
};

export default useEnterOTP;
