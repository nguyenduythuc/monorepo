import {useCustomForm} from '@lfvn-customer/shared/components/Form/Form.hook';
import {FieldVerifyAccount} from '@lfvn-customer/shared/components/Form/Form.utils';
import {
  useGenerateOTPMutation,
  useRegisterMutation,
  useVerifyAccountMutation,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useEffect, useState} from 'react';
import {handleResponseOTPGenerateAPI} from '../utils/handleResponseAPI';
import {
  API_SUCCESS_MESSAGE,
  PREVIOUS_ROUTE,
  VERIFY_ACCOUNT_ID,
} from '../utils/constants';
import {Keyboard} from 'react-native';
import {useConfigRouting} from './routing';
import useShowToast from './useShowToast';
import useTranslations from './useTranslations';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {OTPTypesEnum} from '@lfvn-customer/shared/types';
import {ErrorResponseProps} from '@lfvn-customer/shared/types/services';
import {AccountType} from '@lfvn-customer/shared/types/services/verifyAccount';
import {storage} from '../utils/storage';

const useVerifyAccount = ({type}: {type: OTPTypesEnum}) => {
  const t = useTranslations();
  // const idTypeList: object[] = [{productName: 'CCCD', productCode: 'cccd'}];

  const [isModalVerifyVisible, setIsModalVerifyVisible] = useState(false);
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

  const [
    generateOTP,
    {isLoading: generateOTPLoading, error: generateOTPError},
  ] = useGenerateOTPMutation();

  const {appNavigate, goBack, getPreviousRoute} = useConfigRouting();
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
    if (generateOTPError) {
      try {
        const data = (generateOTPError as ErrorResponseProps)?.data;
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
  }, [generateOTPError]);

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
                storage.set(
                  VERIFY_ACCOUNT_ID,
                  JSON.stringify({
                    phoneNum: phoneNumber,
                    idNum: idCard,
                  }),
                );
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
              setIsModalVerifyVisible(true);
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

  const savePreviousRoute = () => {
    storage.set(PREVIOUS_ROUTE, getPreviousRoute());
  };

  const onSuccessSubmit = () => {
    const previousRoute = storage.getString(
      PREVIOUS_ROUTE,
    ) as keyof typeof ScreenParamEnum;
    appNavigate(ScreenParamEnum[previousRoute]);
  };

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
    isError: !!generateOTPError,
    isLoading: verifyAccountLoading || generateOTPLoading || loadingRegister,
    onPressGoBack,
    setIsModalVerifyVisible,
    isModalVerifyVisible,
    msgRequestError,
    onCustomerCancel,
    savePreviousRoute,
    onSuccessSubmit,
  };
};

export default useVerifyAccount;
