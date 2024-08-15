import {useEffect, useState} from 'react';
import * as Keychain from 'react-native-keychain';
import {
  useActiveBiometricMutation,
  useCheckBiometricMutation,
  useDeactiveBiometricMutation,
  useBiometricTokenMutation,
} from '../redux/slices/apiSlices';
import {useAppSelector} from '../redux/store';
import {getDeviceName, getBrand} from 'react-native-device-info';
import {mmkvStorage} from '../utils/storage';
import {USER_LOGIN, UUID} from '../utils/constants';
import ReactNativeBiometrics from 'react-native-biometrics';
import Toast from 'react-native-toast-message';
import useTranslations from './useTranslations';

const useLoginBiometrics = () => {
  const {user, token} = useAppSelector(state => state.auth);
  const [checkBiometric] = useCheckBiometricMutation();
  const [activeBiometric] = useActiveBiometricMutation();
  const [deactiveBiometric] = useDeactiveBiometricMutation();
  const [biometricToken, {isError: biometricLoginError}] =
    useBiometricTokenMutation();
  const [biometricType, setBiometricType] = useState<
    'TOUCH_ID' | 'FACE_ID' | null
  >(null);
  const [enableBiometric, setEnableBiometric] = useState<boolean>(false);

  const t = useTranslations();

  useEffect(() => {
    (async () => {
      const biometricType = await Keychain.getSupportedBiometryType();
      const typeBiometricForSubmit =
        biometricType === Keychain.BIOMETRY_TYPE.TOUCH_ID
          ? 'TOUCH_ID'
          : biometricType === Keychain.BIOMETRY_TYPE.FACE_ID
          ? 'FACE_ID'
          : null;
      setBiometricType(typeBiometricForSubmit);
    })();
  }, []);

  useEffect(() => {
    if (biometricLoginError && biometricType) {
      Toast.show({
        type: 'error',
        text1: t('Login.biometricLoginFail', {
          biometricType: biometricType.replace('_', ' '),
        }),
      });
    }
  }, [biometricLoginError, biometricType]);

  useEffect(() => {
    // Function to check if biometric authentication is supported
    (async () => {
      const userLogin = await mmkvStorage.getItem(USER_LOGIN);
      const credentials = await Keychain.getGenericPassword();
      const uuid = await mmkvStorage.getItem(UUID);
      if (userLogin && credentials && userLogin === credentials?.username) {
        if (!!biometricType) {
          const result = await checkBiometric({
            login: userLogin,
            token: credentials.password,
            uuid,
          });
          setEnableBiometric(result.data?.isActive || false);
        }
      }
    })();
  }, [biometricType]);

  const handleChangeBiometricStatus = async () => {
    const userLogin = await mmkvStorage.getItem(USER_LOGIN);
    const uuid = await mmkvStorage.getItem(UUID);
    if (biometricType) {
      if (enableBiometric) {
        // Biometric is enabled, deactivate it
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          // username is user login
          // password is biometric token
          const {username, password} = credentials;
          await deactiveBiometric({
            login: username,
            uuid,
            token: password,
          });
          await Keychain.resetGenericPassword();
        }
      } else if (userLogin) {
        // Biometric is disabled, activate it
        const result = await activeBiometric({
          login: userLogin,
          uuid,
          deviceName: await getDeviceName(),
          brandName: getBrand(),
          location: '',
          biometricType,
        });
        if (result.data?.token) {
          await Keychain.setGenericPassword(userLogin, result.data.token);
        }
      }
      setEnableBiometric(prev => !prev);
    }
  };

  const onPressBiometricLogin = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const {success, error} = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate to continue',
      });

      if (success) {
        const credentials = await Keychain.getGenericPassword();
        const uuid = await mmkvStorage.getItem(UUID);
        if (credentials) {
          const {username, password} = credentials;
          const result = await biometricToken({
            login: username,
            uuid,
            token: password,
          });
          console.log('result', result);
        }
      } else {
        console.log('Authentication failed', 'Biometric authentication failed');
      }
    } catch (error) {
      console.log('[handleBiometricAuth] Error:', error);
    }
  };

  return {
    onPressBiometricLogin,
    biometricType,
    enableBiometric,
    handleChangeBiometricStatus,
  };
};

export default useLoginBiometrics;
