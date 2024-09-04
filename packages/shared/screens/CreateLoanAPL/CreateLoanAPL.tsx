import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {
  Appbar,
  CustomButton,
  Icon,
  IconKeys,
  Image,
} from '@lfvn-customer/shared/components';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import {ProductIntroDataType} from '@lfvn-customer/shared/types/services/productTypes';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';
import {BaseProcess} from '@lfvn-customer/shared/components/common/Process/Process';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';

export type DescriptionInfo = {
  icon: IconKeys;
  description: string;
  hightlight: string;
};

const CreateLoanAPLScreen = ({t}: {t: any}) => {
  const {theme} = useGetTheme();
  const {textNegative500} = theme;
  const {appNavigate} = useConfigRouting();

  const listProductData: ProductIntroDataType[] = useAppSelector(
    state => state.product.listProduct,
  );

  console.log('listProduct', listProductData);

  const loanStep = [
    {title: 'Loan information'},
    {title: 'Verify information'},
    {title: 'Input profile information'},
    {title: 'Upload document'},
    {title: 'Disbursement'},
  ];

  return (
    <>
      <Appbar
        backIconColor="white"
        contentTextStyle={tw.style('text-white')}
        labelContent={t('ProductIntroduction.cashLoan')}
      />

      <ScrollView style={tw`flex-1`}>
        <View style={tw.style('justify-center items-center')}>
          <Image
            iconName="create_loan_apl_center"
            style={tw.style('h-[200px]')}
          />
        </View>
        <View
          style={tw.style(
            'bg-white flex-1 mx-4 px-5 py-4 shadow-lg rounded-20px',
          )}>
          <Text
            style={tw.style(`text-2xl font-semibold pb-2 ${textNegative500}`)}>
            {t('ProductDetail.createLoanApl')}
          </Text>

          <Text style={tw.style(`text-base pb-1 ${textNegative500}`)}>
            {t('ProductDetail.createLoanInstruction')}
          </Text>

          <View style={tw.style('pb-2')}>
            <BaseProcess
              orientation="vertical"
              currentStep={1}
              steps={loanStep}
              color="red"
              verticalHeight={55}
            />
          </View>

          <View style={tw.style('py-2')}>
            <CustomButton
              size="md"
              onPress={() => appNavigate(ScreenParamEnum.Simulate)}
              color="red">
              {t('ProductDetail.continue')}
            </CustomButton>
          </View>
        </View>
        <View style={tw.style('flex-row items-start justify-start mx-4 mt-8')}>
          <View style={tw.style('pt-1')}>
            <Icon name="comment-question-icon" />
          </View>
          <View style={tw.style('flex flex-col items-start ml-3 flex-1')}>
            <Text style={tw.style('text-lg font-semibold pb-1')}>
              {t('ProductDetail.needAdvice')}
            </Text>
            <Text style={tw.style(' pb-0.5')}>
              {t('ProductDetail.contactDescription')}
              <Text style={tw.style('text-blue-500')}> 0975811555</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default CreateLoanAPLScreen;
