import {useCallback, useEffect} from 'react';
import {useAppSelector} from '../redux/store';
import {ScreenParamEnum} from '../types/paramtypes';
import {useConfigRouting} from './routing';
import useHandleRequestPending from './useHandleRequestPending';
import DeviceInfo from 'react-native-device-info';
import {storage} from '../utils/storage';
import {DEVICE_INFO} from '../utils/constants';
import {nanoid} from '@reduxjs/toolkit';
import useHandleFocusScreen from './useHandleFocusScreen';

const useHome = () => {
  const {user} = useAppSelector(state => state.auth);
  const {appNavigate} = useConfigRouting();

  const {isModalVisible, setIsModalVisible, contentModal, setContentModal} =
    useHandleFocusScreen({user});

  const getDeviceInfo = async () => {
    try {
      const deviceIdData = await DeviceInfo.getUniqueId();
      const deviceName = await DeviceInfo.getDeviceName();

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
    if (!!user && user?.identityIssue) {
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
