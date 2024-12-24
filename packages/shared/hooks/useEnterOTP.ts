import {
  useOtpResendBaseMutation,
  useResendOTPMutation,
  useResendOTPSignContractMutation,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useEffect, useState} from 'react';
import {API_SUCCESS_MESSAGE} from '@lfvn-customer/shared/utils/constants';
import {handleResponseOTPGenerateAPI} from '@lfvn-customer/shared/utils/handleResponseAPI';
import {Keyboard} from 'react-native';
import useShowToast from './useShowToast';
import useTranslations from './useTranslations';
import {useConfigRouting} from './routing';
import {OTPTypesEnum} from '@lfvn-customer/shared/types';
import {ErrorResponseProps} from '@lfvn-customer/shared/types/services';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';

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
  type: OTPTypesEnum;
  value: string;
  setValue: (value: string) => void;
}) => {
  const t = useTranslations();
  const [resendOTP, {error}] = useResendOTPMutation();
  const [resendOTPESign] = useOtpResendBaseMutation();
  const [resendOTPSignContract] = useResendOTPSignContractMutation();
  const {handleShowToast, showCommonErrorToast} = useShowToast();
  const {goBack} = useConfigRouting();

  const {dataSaleInfo} = useAppSelector(state => state.eSignForSale);

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
    let result;
    switch (type) {
      case OTPTypesEnum.LOGIN_OTP:
        result = await resendOTP({
          phoneNumber,
          identityNumber,
          authSeq,
          type: 'AUTH',
        });
        break;
      case OTPTypesEnum.ESIGN:
        result = await resendOTPESign({
          phoneNumber: dataSaleInfo?.phoneNumber ?? '',
          identityNumber: dataSaleInfo?.idCardNumber ?? '',
          authSeq,
          type: OTPTypesEnum.ESIGN,
        });
        break;
      case OTPTypesEnum.CONFIRM_ESIGN:
        result = await resendOTPSignContract({
          id: Number(dataSaleInfo?.saleImportId ?? 0),
          idCardNumber: dataSaleInfo?.idCardNumber ?? '',
          tokenEsign: dataSaleInfo?.tokenEsign ?? '',
        });
        break;
      // eslint-disable-next-line sonarjs/no-duplicated-branches
      default:
        result = await resendOTP({
          phoneNumber,
          identityNumber,
          authSeq,
          type: 'AUTH',
        });
        break;
    }
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
