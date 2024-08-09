import {Platform, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import tw from 'twrnc';
import {Icon, IconKeys} from '@lfvn-customer/shared/components';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';
import {
  useGetMetadataQuery,
  useGetProductListQuery,
} from '../../redux/slices/apiSlices';
import {useDispatch} from 'react-redux';
import {setListProduct} from '../../redux/slices/productSlices';
import {setSimulate} from '../../redux/slices/publicSlices';

export type ListFeatureType = {
  iconName: IconKeys;
  title: string;
};

export const HomeScreen = ({}) => {
  const {appNavigate} = useConfigRouting();
  const dispatch = useDispatch();
  const {
    data: productListData,
    isError: productListError,
    isLoading: productListLoading,
  } = useGetProductListQuery();

  const {
    data: metaData,
    error: metadataError,
    isLoading: metadataLoading,
  } = useGetMetadataQuery();

  useEffect(() => {
    console.log('productListData', productListData);
    dispatch(setListProduct(productListData));
  }, [productListData]);

  console.log('metadataLoading', metadataLoading);
  console.log('metaData', metaData);
  console.log('metadataError', metadataError);

  useEffect(() => {
    dispatch(setSimulate(metaData?.data.simulate.jsFunctionContent));
  }, [metaData, metadataLoading]);

  const productIntroductionScreen =
    Platform.OS !== 'web'
      ? 'ProductIntroductionScreen'
      : 'product-introduction';

  const listFeature: ListFeatureType[] = [
    {iconName: 'fast-loan-menu-icon', title: 'Fast loan'},
    {iconName: 'cash-loan-icon', title: 'Cash loan'},
    {iconName: 'credit-card-icon', title: 'Credit card'},
    {iconName: 'car-loan-icon', title: 'Car loan'},
  ];

  return (
    <View style={tw.style('mt-10 mx-4')}>
      <View>
        <Text>Chào buổi sáng</Text>
        <Text style={tw.style('text-2xl font-semibold')}>Vũ Phúc Hưng</Text>
      </View>
      <View
        style={tw.style(
          'flex-row  bg-white rounded-2xl px-4 py-3 shadow-md mt-8 justify-between',
        )}>
        {listFeature.map((item, index) => (
          <View key={index} style={tw`flex-1 items-center`}>
            <TouchableOpacity
              onPress={() => {
                appNavigate(productIntroductionScreen);
              }}
              style={tw`flex-col items-center justify-center z-10`}>
              <View
                style={tw`bg-white rounded-full w-12.5 h-12.5 justify-center items-center`}>
                <Icon name={item.iconName} disabled />
              </View>

              <View style={tw`flex-col`}>
                <Text style={tw` text-center`}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};
