import {useCustomForm} from '@lfvn-customer/shared/components/Form/Form.hook';
import {FieldTestConfig} from '@lfvn-customer/shared/components/Form/Form.utils';
import {useRegisterMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import useShowToast from './useShowToast';
import {handleResponseOTPGenerateAPI} from '../utils/handleResponseAPI';
import {API_SUCCESS_MESSAGE} from '../utils/constants';
import {useConfigRouting} from './routing';
import useTranslations from './useTranslations';
import {ScreenParamEnum} from '../../mobile/src/types/paramtypes';

const useSignUp = () => {
  const t = useTranslations();
  const fields = [
    FieldTestConfig.SignUpFullName,
    FieldTestConfig.SignUpPhoneNumber,
    FieldTestConfig.SignUpPersonalCard,
  ];
  const {appNavigate, goBack} = useConfigRouting();
  const [register, {isError, isLoading}] = useRegisterMutation();
  const {handleShowToast} = useShowToast();

  const [isAcceptTC, setIsAcceptTC] = useState<boolean>(false);

  const {reset, renderFrom, handleSubmit, watch, control, setValue, getValues} =
    useCustomForm({
      fields,
      defaultValues: {},
    });

  useEffect(() => {
    if (isError) {
      handleShowToast({
        msg: t('VerifyAccount.msgVerifyFail'),
        type: 'error',
      });
    }
  }, [isError]);

  const onPressSubmit = handleSubmit(async () => {
    Keyboard.dismiss();
    const {fullname, phoneNumber, idCard} = getValues();
    const result = await register({
      login: idCard,
      fullName: fullname,
      phoneNumber,
      identityNumber: idCard,
      password: 'lfvn@123', // TODO: password will be handled by BE in the feature
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
      const authSeq = result.data?.authSeq;
      if (authSeq) {
        appNavigate(ScreenParamEnum.EnterOtp, {
          authSeq,
          phoneNumber,
          identityNumber: idCard,
          type: 'SIGN_UP',
        });
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
    isError,
    isLoading,
    onPressGoBack,
    isAcceptTC,
    setIsAcceptTC,
  };
};

export default useSignUp;
