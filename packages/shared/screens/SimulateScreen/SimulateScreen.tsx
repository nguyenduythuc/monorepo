import {
  Appbar,
  ConfirmModal,
  CustomButton,
  Icon,
} from '@lfvn-customer/shared/components';
import useSimulateScreen from '@lfvn-customer/shared/hooks/useSimulateScreen';
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {formatNewAmount} from '@lfvn-customer/shared/utils/commonFunction';
import {useConfigRouting} from '@lfvn-customer/shared/hooks/routing';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';

export const SimulateScreen = () => {
  const {
    renderFrom: simulateForm,
    selectProduct,
    estimatePaymentMonthly,
    onPressSubmit,
    isModalVisible,
    setIsModalVisible,
  } = useSimulateScreen();

  const t = useTranslations();
  const {appNavigate} = useConfigRouting();

  return (
    <>
      <Appbar labelContent={t('Simulate.simulate')} />
      <ScrollView style={tw`flex-1`}>
        <View style={tw`px-4 mt-4`}>
          <Text style={tw`text-3xl font-bold`}>{t('Simulate.loanInfo')}</Text>
          <Text style={tw`text-lg mt-2`}>{t('Simulate.loanInfoDes')}</Text>
          <View style={tw``}>
            {simulateForm()}

            <Text style={tw`text-xl font-bold mt-5`}>
              {t('Simulate.loanEstimate')}
            </Text>

            <View style={tw`flex flex-row justify-around mt-4`}>
              <View
                style={tw`bg-red-100 flex-1 rounded-xl py-2 px-3 items-center`}>
                <View style={tw`flex-row items-center`}>
                  <Text style={tw`text-base font-semibold pr-2`}>
                    {t('Simulate.monthlyPay')}
                  </Text>
                  <Icon size={15} color="#E7252B" name="info-icon" />
                </View>
                <Text style={tw`text-xl font-semibold text-red-500`}>
                  {formatNewAmount(estimatePaymentMonthly).numberMoneyFormat}{' '}
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
                    {t('Simulate.interestRate')}
                  </Text>
                  <Icon size={15} color="#E7252B" name="info-icon" />
                </View>
                <Text style={tw`text-xl font-semibold text-red-500`}>
                  {selectProduct.interest}%
                  <Text style={tw`font-normal text-black`}>
                    /{t('Simulate.year')}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={tw`mt-2`}>
              <CustomButton
                onPress={() => appNavigate(ScreenParamEnum.RepaymentSchedule)}
                styleTextLeft
                variant="text"
                prefixIcon="calendar-icon">
                {t('Simulate.repaymentSchedule')}
              </CustomButton>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={tw`px-4 pt-3 pb-4 border-t border-gray-200`}>
        <CustomButton onPress={onPressSubmit} color="red">
          {t('Simulate.submit')}
        </CustomButton>
      </View>
      <ConfirmModal
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        content={t('Simulate.alertTitleUncheckInsurance')}
        labelButtonRight={t('Simulate.confirm')}
        singleButton
      />
    </>
  );
};

export default SimulateScreen;
