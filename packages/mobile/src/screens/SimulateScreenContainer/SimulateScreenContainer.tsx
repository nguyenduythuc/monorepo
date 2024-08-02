import {
  Appbar,
  AppbarAction,
  AppbarBackAction,
  AppbarContent,
  Checkbox,
  CustomButton,
  Icon,
} from '@lfvn-customer/shared/components';
import useSimulateScreen from '@lfvn-customer/shared/hooks/useSimulateScreen';
import React, {useMemo} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import {formatNewAmount} from '@lfvn-customer/shared/utils/commonFunction';
import {PrimaryNavigatorNavigationProp} from '../../navigators/RootNavigator';
import {useNavigation} from '@react-navigation/native';
import {SimulateScreen} from '@lfvn-customer/shared/screen';

export const SimulateScreenContainer = () => {
  return (
    <View style={tw`h-screen bg-white`}>
      <SafeAreaView style={tw`h-screen`}>
        <SimulateScreen />
      </SafeAreaView>
    </View>
  );
};

export default SimulateScreenContainer;
