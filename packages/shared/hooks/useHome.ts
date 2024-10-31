import {useCallback, useEffect, useState} from 'react';
import {useAppSelector} from '../redux/store';
import {ScreenParamEnum} from '../types/paramtypes';
import {useConfigRouting} from './routing';
import useHandleRequestPending from './useHandleRequestPending';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {useFocusEffect} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import {storage} from '../utils/storage';
import {DEVICE_INFO} from '../utils/constants';
import {nanoid} from '@reduxjs/toolkit';

const useHome = () => {
  const {user} = useAppSelector(state => state.auth);
  const {appNavigate} = useConfigRouting();
  const t = useTranslations();

  const getDeviceInfo = async () => {
    try {
      const appVersion = DeviceInfo.getVersion();
      const deviceIdData = await DeviceInfo.getUniqueId();
      const deviceName = await DeviceInfo.getDeviceName();
      const os = DeviceInfo.getSystemName();
      const osVersion = DeviceInfo.getSystemVersion();

      if (deviceIdData) {
        storage.set(
          DEVICE_INFO,
          JSON.stringify({
            deviceIdData: deviceIdData,
            deviceName: deviceName,
          }),
        );
      } else {
        storage.set(DEVICE_INFO, nanoid());
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  useEffect(() => {
    getDeviceInfo();
  }, []);

  const {onCheckRequestPending} = useHandleRequestPending();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contentModal, setContentModal] = useState('');

  // useFocusEffect(
  //   useCallback(() => {
  //     if (user && !user?.identityIssue) {
  //       // not verify account by ekyc
  //       setIsModalVisible(true);
  //       setContentModal(t('Home.verifyAccount'));
  //     } else if (user?.changeRequired) {
  //       // not update password
  //       setIsModalVisible(true);
  //       setContentModal(t('Home.changePasswordFirstTime'));
  //     }
  //     return () => {};
  //   }, [user]),
  // );

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
