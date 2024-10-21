import {useCustomForm} from '@lfvn-customer/shared/components/Form/Form.hook';
import {FieldTestConfig} from '@lfvn-customer/shared/components/Form/Form.utils';
import {useRegisterMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import useShowToast from './useShowToast';
import {useConfigRouting} from './routing';
import useTranslations from './useTranslations';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {OTPTypesEnum} from '../types';
import {VERIFY_ACCOUNT_ID} from '../utils/constants';
import {storage} from '../utils/storage';
import {useDispatch} from 'react-redux';
import {setIdentityNumber} from '../redux/slices/authSlice';

const useSignUp = () => {
  const t = useTranslations();
  const fields = [
    FieldTestConfig.SignUpPhoneNumber,
    FieldTestConfig.SignUpPersonalCard,
  ];
  const {appNavigate} = useConfigRouting();
  const [register, {isError, isLoading}] = useRegisterMutation();
  const {handleShowToast} = useShowToast();

  const dispatch = useDispatch();

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
    const {phoneNumber, idCard} = getValues();

    storage.set(
      VERIFY_ACCOUNT_ID,
      JSON.stringify({
        phoneNum: phoneNumber,
        idNum: idCard,
      }),
    );

    const result = await register({
      login: idCard,
      phoneNumber,
      identityNumber: idCard,
      changeRequired: true,
    });
    if (result.data) {
      const authSeq = result.data?.authSeq;
      if (authSeq) {
        dispatch(setIdentityNumber(idCard));
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
