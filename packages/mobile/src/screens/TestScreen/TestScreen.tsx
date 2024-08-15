import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import useLoginBiometrics from '@lfvn-customer/shared/hooks/useLoginBiometrics';
import {CustomButton, SwitchCustom} from '@lfvn-customer/shared/components';
import {useNavigation} from '@react-navigation/native';
import {PrimaryNavigatorNavigationProp} from '../../navigators/RootNavigator';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import uuid from 'react-native-uuid';
import {mmkvStorage} from '@lfvn-customer/shared/utils/storage';
import {UUID} from '@lfvn-customer/shared/utils/constants';

const TestScreen = () => {
  const navigation = useNavigation<PrimaryNavigatorNavigationProp>();
  const {user} = useAppSelector(state => state.auth);

  useEffect(() => {
    // generate new uuid and save it to storage
    // TODO: will move this func to Flash Screen
    (async () => {
      const deviceUUID = await mmkvStorage.getItem(UUID);
      if (!deviceUUID) {
        const newUUID = uuid.v4();
        await mmkvStorage.setItem(UUID, newUUID);
      }
    })();
  }, []);

  const {biometricType, handleChangeBiometricStatus, enableBiometric} =
    useLoginBiometrics();

  const onPressLoginScreen = () => {
    navigation.navigate('login');
  };

  const onPressStatusBiometrics = () => {
    handleChangeBiometricStatus();
    // onPressSubmit();
  };

  return (
    <View style={tw.style('flex-1')}>
      <SafeAreaView style={tw.style('flex-1 p-4')}>
        <Text style={tw.style('text-red-500')}>Test screen</Text>
        <TouchableOpacity
          onPress={onPressLoginScreen}
          style={tw.style('p-4 items-center bg-red-500')}>
          <Text>{!user ? 'Login' : 'Logout'}</Text>
        </TouchableOpacity>
        {user && (
          <View style={tw`flex flex-row mt-4`}>
            <SwitchCustom
              color="green"
              size="lg"
              value={enableBiometric}
              onChange={onPressStatusBiometrics}
              disabled={!biometricType}
            />
          </View>
        )}
        <Text style={tw`mt-5 text-lg`}>
          Biometric login: {!biometricType ? 'Not supported' : biometricType}
        </Text>
        <CustomButton
          buttonStyle="mt-4"
          onPress={() => {
            navigation.navigate('ComponentScreen');
          }}>
          Component Screen
        </CustomButton>
      </SafeAreaView>
    </View>
  );
};

export default TestScreen;
