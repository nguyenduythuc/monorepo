import {useCustomForm} from '../components/Form/Form.hook';
import {FieldTestConfig} from '../components/Form/Form.utils';
import {useGenerateOTPMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useNavigation} from '@react-navigation/native';
import {EnterOTPScreenNavigationProps} from '../../mobile/src/types/paramtypes';
import Toast from 'react-native-toast-message';
import {useEffect} from 'react';
import {useTranslations} from 'use-intl';
import {handleResponseOTPGenerateAPI} from '../utils/handleResponseAPI';
import {API_SUCCESS_CODE, API_SUCCESS_MESSAGE} from '../utils/constants';
import {Keyboard} from 'react-native';

const useVerifyAccount = () => {
  const t = useTranslations();
  const fields = [FieldTestConfig.IdCard, FieldTestConfig.PhoneNumber];
  const [generateOTP, {isError, isLoading}] = useGenerateOTPMutation();
  const navigation = useNavigation<EnterOTPScreenNavigationProps>();

  const {reset, renderFrom, handleSubmit, watch, control, setValue, getValues} =
    useCustomForm({
      fields,
      defaultValues: {},
    });

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text1: t('VerifyAccount.msgVerifyFail'),
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
    if (result.data?.code !== API_SUCCESS_CODE) {
      Toast.show({
        type: 'error',
        text1: t('VerifyAccount.msgVerifyFail'),
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
        const authSeq = result.data?.data.authSeq;
        if (authSeq) {
          navigation.navigate('EnterOTP', {
            authSeq,
            phoneNumber,
            identityNumber: idCard,
          });
        }
      }
    }
  });

  const onPressGoBack = () => {
    navigation.goBack();
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
