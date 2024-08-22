import React from 'react';
import {View, Text, Platform, ScrollView} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {
  Appbar,
  CustomButton,
  IconKeys,
  ProductCardProp,
  ProductDetailInfoCard,
  Image,
} from '@lfvn-customer/shared/components';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import {ProductIntroDataType} from '@lfvn-customer/shared/types/services/productTypes';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';
import {productDetail} from '@lfvn-customer/shared/assets';
import {useGetProductByIdQuery} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {ScreenParamEnum} from '../../../mobile/src/types/paramtypes';
import {formatNewAmount} from '../../utils/commonFunction';

export type DescriptionInfo = {
  icon: IconKeys;
  description: string;
  hightlight: string;
};

export type detailParamsProp = {
  productId: number;
  productName?: string;
};

const ProductDetailScreen = ({
  t,
  params,
}: {
  t: any;
  params?: detailParamsProp;
}) => {
  console.log('params', params);
  const {theme} = useGetTheme();
  const {textNegative500} = theme;
  const {appNavigate} = useConfigRouting();

  const listProductData: ProductIntroDataType[] = useAppSelector(
    state => state.product.listProduct,
  );

  console.log('listProduct', listProductData);

  const {data: productDetailData} = useGetProductByIdQuery({
    productId: params?.productId ?? 1,
  });

  console.log('data', productDetailData);

  const submitAction = () => {
    appNavigate(ScreenParamEnum.CreateLoanApl);
  };

  const ProductList: ProductCardProp[] = [
    {
      iconName: 'quick-approve-icon',
      title: 'Quick approve',
      description: 'Approve within just 15 minute',
    },
    {
      iconName: 'money-bag-icon',
      title: 'Low interest rate',
      description: 'Only from 28%/year',
    },
    {
      iconName: 'time-money-icon',
      title: 'Flexible tenor',
      description: 'From 6 to 36 months',
    },
    {
      iconName: 'doc-loan-icon',
      title: 'Simple loan procedures',
      description: 'Amount up to VND100 million',
      description2: 'Only CCCD, no income proof',
    },
  ];

  const ProducDetailData = {
    maxAmount: '5000000',
    description:
      'Sản phẩm vay siêu nhanh được thiết kế tối giản thủ tục. Khách hàng chỉ cần cung cấp CCCD. Phê duyệt hoàn toàn tự động, chỉ trong 15 phút* là bạn đã có thể nhận tiền mặt lên tới 5 triệu đồng.',
  };

  return (
    <>
      <Appbar labelContent={params?.productName} />
      <ScrollView style={tw`flex-1`}>
        <View style={tw.style('justify-center items-center')}>
          <Image
            source={{
              android: 'product_detail',
              ios: productDetail,
              web: '/images/product_detail.png',
            }}
            style={tw.style('h-[200px]')}
          />
        </View>
        <View style={tw.style('mx-4 my-2 items-center justify-center py-2')}>
          <Text style={tw.style('text-black px-4 text-xl font-semibold')}>
            {t('ProductIntroduction.loanAmountUp')}
          </Text>
          <Text style={tw.style('text-red-500 my-3 text-32px font-bold px-4')}>
            {formatNewAmount(+ProducDetailData.maxAmount).numberMoneyFormat} VND
          </Text>
          <Text style={tw.style('text-black mt-1 px-2 text-center')}>
            {ProducDetailData.description}
          </Text>
        </View>

        <View style={tw.style('flex-1 px-4 pb-2')}>
          <View style={tw.style('flex-1')}>
            <Text
              style={tw.style(`text-base font-semibold ${textNegative500}`)}>
              {t('ProductDetail.productInfo')}
            </Text>
          </View>
          <View style={tw.style('flex-1 flex-col mt-4')}>
            {ProductList.map((item, index) => (
              <ProductDetailInfoCard
                onPress={item.onPress}
                key={index}
                iconName={item.iconName}
                title={item.title}
                description2={item.description2}
                description={item.description}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={tw`bg-white px-4 pt-3 pb-4 border-t border-gray-200`}>
        <CustomButton onPress={submitAction} color="red">
          {t('ProductDetail.borrowNow')}
        </CustomButton>
      </View>
    </>
  );
};

export default ProductDetailScreen;
