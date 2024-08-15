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

const useVerifyAccount = ({type}: {type: string}) => {
  const t = useTranslations();

  const fields = [FieldTestConfig.IdCard, FieldTestConfig.PhoneNumber];
  const [generateOTP, {isError, isLoading}] = useGenerateOTPMutation();

  const {appNavigate, goBack} = useConfigRouting();
  const {handleShowToast} = useShowToast();

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
    const {idCard, phoneNumber} = getValues();
    const result = await generateOTP({
      phoneNumber,
      identityNumber: idCard,
      authSeq: null,
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
  };
};

export default useVerifyAccount;
