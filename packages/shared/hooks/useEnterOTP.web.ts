import {
  useOtpResendBaseMutation,
  useResendOTPMutation,
  useResendOTPSignContractMutation,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {useConfigRouting} from './routing';
import useShowToast from './useShowToast';
import {OTPTypesEnum} from '@lfvn-customer/shared/types';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';

const CELL_COUNT = 6;
const useEnterOTP = ({
  authSeq,
  phoneNumber,
  identityNumber,
  type,
  value,
  setValue,
}: {
  authSeq: string;
  phoneNumber: string;
  identityNumber: string;
  type: OTPTypesEnum;
  value: string;
  setValue: (value: string) => void;
}) => {
  const t = useTranslations();
  const [resendOTP, {isError: isResendError}] = useResendOTPMutation();
  const [resendOTPESign, {isError: isResendESignError}] =
    useOtpResendBaseMutation();
  const [resendOTPSignContract, {isError: isResendOTPSignContracError}] =
    useResendOTPSignContractMutation();

  const {dataSaleInfo} = useAppSelector(state => state.eSignForSale);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [counter, setCounter] = useState(180); // Đếm ngược từ 180 giây (3 phút)
  const [isCounting, setIsCounting] = useState(true);
  const [msgRequestError, setMsgRequestError] = useState('');

  const {goBack} = useConfigRouting();
  const {handleShowToast} = useShowToast();

  const onPressGoBack = () => {
    goBack();
  };

  useEffect(() => {
    if (isResendError || isResendESignError || isResendOTPSignContracError) {
      handleShowToast({
        msg: t('EnterOTP.msgResendFail'),
        type: 'error',
      });
    }
  }, [isResendError, isResendESignError, isResendOTPSignContracError]);

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
    setValue('');
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
      setCounter(180);
      setIsCounting(true);
      setMsgRequestError('');
    }
  };

  return {
    onPressGoBack,
    onPressResendOTP,
    value,
    setValue,
    counter,
    isCounting,
    CELL_COUNT,
    isModalVisible,
    setIsModalVisible,
    msgRequestError,
  };
};

export default useEnterOTP;
