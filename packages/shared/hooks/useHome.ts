import {useCallback, useEffect, useState} from 'react';
import {useAppSelector} from '../redux/store';
import {ScreenParamEnum} from '../types/paramtypes';
import {useConfigRouting} from './routing';
import useHandleRequestPending from './useHandleRequestPending';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {useFocusEffect} from '@react-navigation/native';

const useHome = () => {
  const {user} = useAppSelector(state => state.auth);
  const {appNavigate} = useConfigRouting();
  const t = useTranslations();

  const {onCheckRequestPending} = useHandleRequestPending();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contentModal, setContentModal] = useState('');

  useFocusEffect(
    useCallback(() => {
      if (user && !user?.identityIssue) {
        // not verify account by ekyc
        setIsModalVisible(true);
        setContentModal(t('Home.verifyAccount'));
      } else if (user?.changeRequired) {
        // not update password
        setIsModalVisible(true);
        setContentModal(t('Home.changePasswordFirstTime'));
      }
      return () => {};
    }, [user]),
  );

  const onPressLogin = () => {
    appNavigate(ScreenParamEnum.Login);
  };

  const onPressSignUp = () => {
    appNavigate(ScreenParamEnum.SignUp);
  };

  const onPressContinueRequestPending = () => {
    appNavigate(ScreenParamEnum.LoanInformation);
  };

  const onPressConfirmModal = () => {
    if (user && !user?.identityIssue) {
      // not verify account by ekyc
      appNavigate(ScreenParamEnum.VerifyCustomerInfo);
      setIsModalVisible(false);
    } else if (user?.changeRequired) {
      // not update password
      appNavigate(ScreenParamEnum.ChangePassword, {
        phoneNumber: user?.phoneNumber,
        identityNumber: user?.identityNumber,
      });
      setIsModalVisible(false);
    }
  };

  const handleCheckRequestPending = useCallback(async () => {
    if (user) {
      onCheckRequestPending(user.login);
    }
  }, [user]);

  useEffect(() => {
    handleCheckRequestPending();
  }, [handleCheckRequestPending]);

  return {
    onPressLogin,
    onPressSignUp,
    onPressContinueRequestPending,
    isModalVisible,
    setIsModalVisible,
    contentModal,
    setContentModal,
    onPressConfirmModal,
  };
};
export default useHome;
