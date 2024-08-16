import {useCustomForm} from '@lfvn-customer/shared/components/Form/Form.hook';
import {FieldTestConfig} from '@lfvn-customer/shared/components/Form/Form.utils';
import {useGenerateOTPMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useEffect} from 'react';
import {handleResponseOTPGenerateAPI} from '../utils/handleResponseAPI';
import {API_SUCCESS_MESSAGE} from '../utils/constants';
import {Keyboard} from 'react-native';
import {useConfigRouting} from './routing';
import useShowToast from './useShowToast';
import useTranslations from './useTranslations';
import {ScreenParamEnum} from '../../mobile/src/types/paramtypes';
import {OTPTypesEnum} from '@lfvn-customer/shared/types';
import {ErrorResponseProps} from '@lfvn-customer/shared/types/services';

const useVerifyAccount = ({type}: {type: OTPTypesEnum}) => {
  const t = useTranslations();

  const fields = [FieldTestConfig.IdCard, FieldTestConfig.PhoneNumber];
  const [generateOTP, {isLoading: generateOTPLoading, error}] =
    useGenerateOTPMutation();

  const {appNavigate, goBack} = useConfigRouting();
  const {handleShowToast} = useShowToast();

  const {reset, renderFrom, handleSubmit, watch, control, setValue, getValues} =
    useCustomForm({
      fields,
      defaultValues: {},
    });

  useEffect(() => {
    if (error) {
      try {
        const data = (error as ErrorResponseProps)?.data;
        const errorCode = JSON.parse(data.detail).code;
        const responseCode = handleResponseOTPGenerateAPI(errorCode);
        if (responseCode.msg !== API_SUCCESS_MESSAGE) {
          if (responseCode.type === 'toast') {
            handleShowToast({
              msg: t(responseCode.msg),
              type: 'error',
            });
          }
        }
      } catch {
        // handle cannot parse error
        handleShowToast({
          msg: t('VerifyAccount.msgVerifyFail'),
          type: 'error',
        });
      }
    }
  }, [error]);

  const onPressSubmit = handleSubmit(async () => {
    Keyboard.dismiss();
    const {idCard, phoneNumber} = getValues();
    if (type === OTPTypesEnum.RESET_PASSWORD) {
      // RESET PASSWORD
      appNavigate('reset-password', {
        phoneNumber,
        identityNumber: idCard,
      });
    } else {
      // LOGIN OTP
      const result = await generateOTP({
        phoneNumber,
        identityNumber: idCard,
        authSeq: null,
        type: 'AUTH',
      });
      if (result.data) {
        const authSeq = result.data?.authSeq;
        if (authSeq) {
          appNavigate(ScreenParamEnum.EnterOtp, {
            authSeq,
            phoneNumber,
            identityNumber: idCard,
            type,
          });
        }
      }
    }
  });

  const onPressGoBack = () => {
    goBack();
  };

  return {
    reset,
    renderFrom,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    onPressSubmit,
    isError: !!error,
    isLoading: generateOTPLoading,
    onPressGoBack,
  };
};

export default useVerifyAccount;
