import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { ReviewCustomerEKYCInfo } from '@lfvn-customer/shared/screens';
import { useRoute } from '@react-navigation/native';
import { ReviewCustomerEKYCInfoScreenRouteProps } from '@lfvn-customer/shared/types/paramtypes';

export const ReviewCustomerEKYCInfoContainer = () => {
  const route = useRoute<ReviewCustomerEKYCInfoScreenRouteProps>();

  const { ekycData } = route.params;

  return (
    <View style={tw.style('flex-1 bg-white')}>
      <SafeAreaView style={tw.style('flex-1')} edges={['top']}>
        <ReviewCustomerEKYCInfo ekycData={ekycData} />
      </SafeAreaView>
    </View>
  );
};

export default ReviewCustomerEKYCInfoContainer;
