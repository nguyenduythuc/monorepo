import {useCustomForm} from '@lfvn-customer/shared/components/Form/Form.hook';
import {FieldTestConfig} from '@lfvn-customer/shared/components/Form/Form.utils';
import {useRegisterMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import useShowToast from './useShowToast';
import {useConfigRouting} from './routing';
import useTranslations from './useTranslations';
import {ScreenParamEnum} from '../../mobile/src/types/paramtypes';
import {OTPTypesEnum} from '../types';

const useSignUp = () => {
  const t = useTranslations();
  const fields = [
    FieldTestConfig.SignUpFullName,
    FieldTestConfig.SignUpPhoneNumber,
    FieldTestConfig.SignUpPersonalCard,
  ];
  const {appNavigate} = useConfigRouting();
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
        msg: t('SignUp.msgSignupFail'),
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
    if (result.data) {
      const authSeq = result.data?.authSeq;
      if (authSeq) {
        appNavigate(ScreenParamEnum.EnterOtp, {
          authSeq,
          phoneNumber,
          identityNumber: idCard,
          type: OTPTypesEnum.SIGN_UP,
        });
      }
    }
  });

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
    isAcceptTC,
    setIsAcceptTC,
  };
};

export default useSignUp;
