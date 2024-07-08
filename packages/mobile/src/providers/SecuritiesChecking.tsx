import React, {useEffect} from 'react';
import {Platform, Text, View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import JailMonkey from 'jail-monkey';
import {useIsEmulator} from 'react-native-device-info';

interface SecuritiesCheckingProps {
  children: React.ReactNode;
}
const SecuritiesChecking: React.FC<SecuritiesCheckingProps> = ({children}) => {
  const [isDevMode, setIsDevMode] = React.useState(false);
  const [isDebuggedMode, setIsDebuggedMode] = React.useState(false);
  const {result: isEmulator} = useIsEmulator();

  useEffect(() => {
    JailMonkey.isDebuggedMode().then(result => {
      if (result) {
        setIsDebuggedMode(true);
      }
    });
    JailMonkey.isDevelopmentSettingsMode().then(result => {
      if (result) {
        setIsDevMode(true);
      }
    });
  }, []);

  if (__DEV__) {
    return children;
  }

  if (JailMonkey.isJailBroken()) {
    return (
      <View style={tw`w-full h-full items-center justify-center`}>
        <Text style={tw`text-red-700 text-center text-lg ml-4 mr-4`}>
          {`We not support ${
            Platform.OS === 'ios' ? 'jail broken' : 'rooted'
          } device.\nPlease use another device.`}
        </Text>
      </View>
    );
  }

  if (isEmulator) {
    return (
      <View style={tw`w-full h-full items-center justify-center`}>
        <Text style={tw`text-red-700 text-center text-lg ml-4 mr-4`}>
          {
            'We not support virtual device.\nPlease use real device to run the app.'
          }
        </Text>
      </View>
    );
  }

  if (isDebuggedMode) {
    return (
      <View style={tw`w-full h-full items-center justify-center`}>
        <Text style={tw`text-red-700 text-center text-lg ml-4 mr-4`}>
          {
            'We not support device with debugged mode enabled.\nPlease disable debugged mode.'
          }
        </Text>
      </View>
    );
  }

  if (JailMonkey.AdbEnabled()) {
    return (
      <View style={tw`w-full h-full items-center justify-center`}>
        <Text style={tw`text-red-700 text-center text-lg ml-4 mr-4`}>
          {'We not support device with adb enabled.\nPlease disable adb.'}
        </Text>
      </View>
    );
  }

  if (JailMonkey.isOnExternalStorage()) {
    return (
      <View style={tw`w-full h-full items-center justify-center`}>
        <Text style={tw`text-red-700 text-center text-lg ml-4 mr-4`}>
          {
            'We not support app installed on external storage.\nPlease move app to internal storage.'
          }
        </Text>
      </View>
    );
  }

  if (isDevMode) {
    return (
      <View style={tw`w-full h-full items-center justify-center`}>
        <Text style={tw`text-red-700 text-center text-lg ml-4 mr-4`}>
          {
            'We not support device with development settings enabled.\nPlease disable development settings.'
          }
        </Text>
      </View>
    );
  }

  return children;
};

export default SecuritiesChecking;
