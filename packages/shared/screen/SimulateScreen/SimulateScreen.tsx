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
import React, {useEffect, useMemo} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Platform} from 'react-native';
import tw from 'twrnc';
import {formatNewAmount} from '@lfvn-customer/shared/utils/commonFunction';
import {PrimaryNavigatorNavigationProp} from '../../../mobile/src/navigators/RootNavigator';
import {useNavigation} from '@react-navigation/native';
import {useConfigRouting} from '../../hooks/routing';
import {useAppSelector} from '../../redux/store';
import {useGetMetadataQuery} from '../../redux/slices/apiSlices';
import {useDispatch} from 'react-redux';
import {setSimulate} from '../../redux/slices/publicSlices';

export const SimulateScreen = () => {
  //   const navigation = useNavigation<PrimaryNavigatorNavigationProp>();
  const {
    renderFrom: simulateForm,
    handleSubmit: handleSimulate,
    getValues: getValueSimulate,
    watch: watchValueSimulate,
    selectProduct,
    estimatePaymentMonthly,
    submitAction,
  } = useSimulateScreen();

  const {
    data: metaData,
    error: metadataError,
    isLoading: metadataLoading,
  } = useGetMetadataQuery();

  const dispatch = useDispatch();

  const {appNavigate} = useConfigRouting();

  const repaymentScheduleScreen =
    Platform.OS !== 'web' ? 'RepaymentScheduleScreen' : 'repayment-schedule';

  if (!metadataError) {
    dispatch(setSimulate(metaData?.data.simulate.jsFunctionContent));
  } else {
    const defaultSimulate =
      'b7uS4IfDq1C92rXDgHAWEW0g2LGpbLKAeNqYC0tRdIRTLhFbMXQEIgMPwIAg9jZLv1uuGTqSbLcvmf4/38l88u//9MRCOFw0lck9mnIyDTKj4iuvL3sPMDaog6mBJxdcpwcEvhOa0Z/GkGunWzv3xGNQ2wvEaSE66+cLZ/Xjfas=';
    dispatch(setSimulate(defaultSimulate));
  }

  return (
    <>
      <Appbar>
        <AppbarBackAction
          onPress={() => {
            // navigation.navigate('SimulateScreen');
          }}
        />
        <AppbarContent title={'Simulate Screen'} />
        <AppbarAction
          title="Save"
          titleStyle={tw`text-blue-500 font-semibold`}
        />
      </Appbar>
      <ScrollView style={tw`flex-1`}>
        <View style={tw`px-4 mt-4`}>
          <Text style={tw`text-3xl font-bold`}>Loan information</Text>
          <Text style={tw`text-lg mt-2`}>
            Please input your lending need to calculate the repayment schedule
          </Text>
          <View style={tw``}>
            {simulateForm()}

            <Text style={tw`text-xl font-bold mt-5`}>Loan estimate</Text>

            <View style={tw`flex flex-row justify-around mt-4`}>
              <View
                style={tw`bg-red-100 flex-1 rounded-xl py-2 px-3 items-center`}>
                <View style={tw`flex-row items-center`}>
                  <Text style={tw`text-base font-semibold pr-2`}>
                    Pay monthly
                  </Text>
                  <Icon size={15} color="#E7252B" name="info-icon" />
                </View>
                <Text style={tw`text-xl font-semibold text-red-500`}>
                  {
                    formatNewAmount(estimatePaymentMonthly)
                      .loanEstimatePayFormat
                  }{' '}
                  <Text style={tw`font-normal text-black`}>
                    {formatNewAmount(estimatePaymentMonthly).currencySymbolVND}
                  </Text>
                </Text>
              </View>
              <View style={tw`w-4`} />
              <View
                style={tw`bg-red-100 flex-1 rounded-xl py-2 px-3 items-center`}>
                <View style={tw`flex-row items-center`}>
                  <Text style={tw`text-base font-semibold pr-2`}>
                    Interest rate
                  </Text>
                  <Icon size={15} color="#E7252B" name="info-icon" />
                </View>
                <Text style={tw`text-xl font-semibold text-red-500`}>
                  {selectProduct.interest}%
                  <Text style={tw`font-normal text-black`}> /year</Text>
                </Text>
              </View>
            </View>
            <View style={tw`mt-2`}>
              <CustomButton
                onPress={() => appNavigate(repaymentScheduleScreen)}
                styleTextLeft
                variant="text"
                prefixIcon="calendar-icon">
                Repayment Schedule
              </CustomButton>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={tw`px-4 pt-3 pb-1 border-t border-gray-200`}>
        <CustomButton onPress={submitAction} color="red">
          Submit
        </CustomButton>
      </View>
    </>
  );
};

export default SimulateScreen;
