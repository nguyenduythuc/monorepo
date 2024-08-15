import React, {useEffect, useMemo} from 'react';
import {View, Text, Pressable, Platform, ScrollView} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {
  Appbar,
  Icon,
  IconKeys,
  ProductCardProp,
} from '@lfvn-customer/shared/components';
import {ProductCard} from '@lfvn-customer/shared/components';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import {ProductIntroDataType} from '@lfvn-customer/shared/types/services/productTypes';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';
import {ScreenParamEnum} from '../../../mobile/src/types/paramtypes';
import {formatNewAmount, formatterVND} from '../../utils/commonFunction';

export type DescriptionInfo = {
  icon: IconKeys;
  description: string;
  hightlight: string;
};

const ProductIntroductionScreen = ({t}: {t: any}) => {
  const {theme, colors} = useGetTheme();
  const {textNegative500, textUseful500, textNegative300} = theme;
  const {appNavigate} = useConfigRouting();

  const listProductData: ProductIntroDataType[] = useAppSelector(
    state => state.product.listProduct,
  );

  console.log('listProduct', listProductData);

  const info: DescriptionInfo[] = [
    {
      icon: 'interest-money-icon',
      description: 'Interest rate only from ',
      hightlight: '28%/year',
    },
    {
      icon: 'time-coin-icon',
      description: 'Approve within ',
      hightlight: '24h',
    },
    {
      icon: 'calendar-dollar-icon',
      description: 'Loan term up to ',
      hightlight: '3 year',
    },
  ];

  const toSimulateScreen = 'product-detail';

  const dataFormat: ProductCardProp[] = useMemo(() => {
    const productList: ProductCardProp[] = [];
    if (listProductData.length > 0) {
      listProductData.forEach((item, index) => {
        const newData: ProductCardProp = {
          iconName: 'fast-loan-icon',
          title: item.name,
          description: 'Quick process in just 15 minute',
          description2: 'Amount up to 5 million',
          onPress: () =>
            appNavigate(toSimulateScreen, {
              productId: item.id,
              productName: item.name,
            }),
        };
        productList.push(newData);
      });
      console.log('productList', productList);
      return productList;
    } else {
      return [];
    }
  }, [listProductData]);

  const ProductList: ProductCardProp[] = [
    {
      iconName: 'fast-loan-icon',
      title: 'Fast loan',
      description: 'Quick process in just 15 minute',
      description2: 'Amount up to 5 million',
      onPress: () =>
        appNavigate(ScreenParamEnum.ProductDetail, {productId: 123}),
    },
    {
      iconName: 'salary-base-loan-icon',
      title: 'Salary base loan',
      description: 'Quick process in just 15 minute',
      description2: 'Amount up to 5 million',
      onPress: () => console.log('Salary base loan'),
    },
    {
      iconName: 'gov-staff-loan-icon',
      title: 'Government staff loan',
      description: 'Amount up to VND100 million',
      description2: 'Approve within 24 hour',
    },
    {
      iconName: 'lady-loan-icon',
      title: 'Lady loan',
      description: 'Amount up to VND100 million',
      description2: 'Approve within 24 hour',
    },
    {
      iconName: 'life-insurance-loan-icon',
      title: 'Life insurance loan',
      description: 'Amount up to VND100 million',
      description2: 'Approve within 24 hour',
    },
    {
      iconName: 'top-up-loan-icon',
      title: 'Top-up loan',
      description: 'Amount up to VND100 million',
      description2: 'Approve within 24 hour',
    },
  ];

  const maxAmount = '100000000';

  return (
    <View style={tw.style('flex-1')}>
      <Appbar
        backIconColor="white"
        labelContent={t('ProductIntroduction.cashLoan')}
        contentTextStyle={tw.style('text-white')}
      />

      <View
        style={tw.style(
          'bg-white bg-opacity-10 mx-4 my-2 rounded-2xl items-center py-2',
        )}>
        <Text style={tw.style('text-white mt-1 px-4')}>
          {t('ProductIntroduction.loanAmountUp')}
        </Text>
        <Text style={tw.style('text-white mt-1 text-30px font-semibold px-4')}>
          {formatNewAmount(+maxAmount).numberMoneyFormat} VND
        </Text>
      </View>
      <View style={tw.style('mx-4 my-2 flex-row justify-between')}>
        {info.map((step, index) => (
          <View key={index} style={tw`flex-1 flex-col items-center z-10`}>
            <Pressable style={tw`items-center`}>
              <View
                style={tw`bg-white rounded-full w-12.5 h-12.5 justify-center items-center`}>
                <Icon name={step.icon} disabled />
              </View>

              <View style={tw`flex-col mt-2`}>
                <Text style={tw`text-white text-center`}>
                  {step.description}
                  <Text style={tw`text-white font-bold`}>
                    {step.hightlight}
                  </Text>
                </Text>
              </View>
            </Pressable>
          </View>
        ))}
      </View>

      <View style={tw.style('flex-1 bg-white px-4 py-6 mt-4 rounded-t-20px')}>
        <View style={tw.style('mb-2')}>
          <Text style={tw.style(`text-base font-semibold ${textNegative500}`)}>
            {t('ProductIntroduction.chooseProductFromList')}
          </Text>
        </View>
        <ScrollView>
          <View style={tw.style('flex-1 flex-col mt-4')}>
            {dataFormat.map((item, index) => (
              <ProductCard
                onPress={item.onPress}
                key={index}
                iconName={item.iconName}
                title={item.title}
                description2={item.description2}
                description={item.description}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProductIntroductionScreen;
