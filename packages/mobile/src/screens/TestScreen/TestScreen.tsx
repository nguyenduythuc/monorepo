import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import useTestScreen from '@lfvn-customer/shared/hooks/useTest';
import useLoginBiometrics from '@lfvn-customer/shared/hooks/useLoginBiometrics';
import {CustomButton} from '@lfvn-customer/shared/components';
import {useNavigation} from '@react-navigation/native';
import {PrimaryNavigatorNavigationProp} from '../../navigators/RootNavigator';

const TestScreen = () => {
  const navigation = useNavigation<PrimaryNavigatorNavigationProp>();

  const {renderFrom, handleSubmit, getValues} = useTestScreen();
  const {callBiometric} = useLoginBiometrics();

  const onPressSubmit = handleSubmit(() => {
    console.log('submit', getValues());
    callBiometric({
      username: 'test',
      password: 'test',
    })
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log('err', err);
      });
  });

  return (
    <View style={tw.style('flex-1')}>
      <SafeAreaView style={tw.style('flex-1 p-4')}>
        <Text style={tw.style('text-red-500')}>Test screen</Text>
        {renderFrom()}
        <TouchableOpacity
          onPress={onPressSubmit}
          style={tw.style('p-4 items-center bg-red-500')}>
          <Text>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressSubmit}
          style={tw.style('p-4 mt-4 items-center bg-red-500')}>
          <Text>Login Biometric</Text>
        </TouchableOpacity>
        <CustomButton
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
