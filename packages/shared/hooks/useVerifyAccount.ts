import {useCustomForm} from '@lfvn-customer/shared/components/Form/Form.hook';
import {FieldVerifyAccount} from '@lfvn-customer/shared/components/Form/Form.utils';
import {
  useGenerateOTPMutation,
  useRegisterMutation,
  useVerifyAccountMutation,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useEffect, useState} from 'react';
import {handleResponseOTPGenerateAPI} from '../utils/handleResponseAPI';
import {API_SUCCESS_MESSAGE} from '../utils/constants';
import {Keyboard} from 'react-native';
import {useConfigRouting} from './routing';
import useShowToast from './useShowToast';
import useTranslations from './useTranslations';
import {ScreenParamEnum} from '../../mobile/src/types/paramtypes';
import {OTPTypesEnum} from '@lfvn-customer/shared/types';
import {ErrorResponseProps} from '@lfvn-customer/shared/types/services';
import {AccountType} from '@lfvn-customer/shared/types/services/verifyAccount';

const useVerifyAccount = ({type}: {type: OTPTypesEnum}) => {
  const t = useTranslations();
  // const idTypeList: object[] = [{productName: 'CCCD', productCode: 'cccd'}];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [msgRequestError, setMsgRequestError] = useState('');

  const fields = [
    FieldVerifyAccount.PhoneNumber,
    // {...FieldVerifyAccount.IdType, options: idTypeList},
    FieldVerifyAccount.IdCard,
  ];

  const [
    verifyAccount,
    {isLoading: verifyAccountLoading, error: verifyAccountError},
  ] = useVerifyAccountMutation();

  const [register, {isError: errorRegister, isLoading: loadingRegister}] =
    useRegisterMutation();

  const [generateOTP, {isLoading: generateOTPLoading, error}] =
    useGenerateOTPMutation();

  const {appNavigate, goBack} = useConfigRouting();
  const {handleShowToast} = useShowToast();

  const onCustomerCancel = () => {
    appNavigate(ScreenParamEnum.Home);
  };

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
      appNavigate(ScreenParamEnum.ResetPassword, {
        phoneNumber,
        identityNumber: idCard,
      });
    }
    if (type === OTPTypesEnum.VERIFY_CUSTOMER_BEFORE_LOAN) {
      try {
        const resultVerifyAccount = await verifyAccount({
          phoneNumber,
          identityNumber: idCard,
        });

        if (resultVerifyAccount.data) {
          switch (resultVerifyAccount.data.type) {
            case AccountType.Register:
              const resultRegister = await register({
                login: idCard,
                phoneNumber,
                identityNumber: idCard,
                changeRequired: true,
              });
              if (resultRegister.data) {
                const authSeq = resultRegister.data?.authSeq;
                if (authSeq) {
                  appNavigate(ScreenParamEnum.EnterOtp, {
                    authSeq,
                    phoneNumber,
                    identityNumber: idCard,
                    type: OTPTypesEnum.SIGN_UP,
                  });
                }
              }

              break;
            case AccountType.Login:
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
                    type: OTPTypesEnum.LOGIN_OTP,
                  });
                }
              }
              break;
            case AccountType.Error:
              setMsgRequestError(t('VerifyAccount.invalidAccountInfo'));
              setIsModalVisible(true);
              break;
          }
        }
      } catch (error) {
        console.log(error);
      }
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
    isLoading: verifyAccountLoading || generateOTPLoading || loadingRegister,
    onPressGoBack,
    setIsModalVisible,
    isModalVisible,
    msgRequestError,
    onCustomerCancel,
  };
};

export default useVerifyAccount;
