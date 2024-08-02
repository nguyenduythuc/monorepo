import CheckCircleIcon from '@lfvn-customer/shared/assets/images/svg/CheckCircleIcon';
import WarningCircleIcon from '@lfvn-customer/shared/assets/images/svg/WarningCircleIcon';
import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {BaseToastProps} from 'react-native-toast-message';

const {width} = Dimensions.get('window');

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: ({text1}: BaseToastProps) => (
    <View
      style={{
        width: width - 32,
        backgroundColor: '#00BC3C',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
      }}>
      <CheckCircleIcon />
      <Text
        style={{
          fontSize: 16,
          color: 'white',
          marginLeft: 16,
          flex: 1,
        }}>
        {text1}
      </Text>
    </View>
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: ({text1}: BaseToastProps) => (
    <View
      style={{
        width: width - 32,
        backgroundColor: '#E7252B',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
      }}>
      <WarningCircleIcon />
      <Text
        style={{
          fontSize: 16,
          color: 'white',
          marginLeft: 16,
          flex: 1,
        }}>
        {text1}
      </Text>
    </View>
  ),
};

export default toastConfig;
