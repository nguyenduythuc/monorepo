import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {CustomButton, Icon, IconKeys} from '@lfvn-customer/shared/components';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';
import {
  useGetMetadataQuery,
  useGetProductListQuery,
  apiSlice,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useDispatch} from 'react-redux';
import {setListProduct} from '@lfvn-customer/shared/redux/slices/productSlices';
import {setSimulate} from '@lfvn-customer/shared/redux/slices/publicSlices';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import useHome from '@lfvn-customer/shared/hooks/useHome';
import {ScreenParamEnum} from '../../../mobile/src/types/paramtypes';

export type ListFeatureType = {
  iconName: IconKeys;
  title: string;
  goPage: ScreenParamEnum;
};

export const HomeScreen = ({}) => {
  const t = useTranslations();
  const {appNavigate} = useConfigRouting();
  const dispatch = useDispatch();

  const {user} = useAppSelector(state => state.auth);

  const {theme} = useGetTheme();
  const {textDanger500} = theme;

  const {onPressLogin, onPressSignUp} = useHome();

  const {data: metaData, isLoading: metadataLoading} = useGetMetadataQuery();

  useEffect(() => {
    dispatch(setSimulate(metaData?.data.simulate.jsFunctionContent));
  }, [metaData, metadataLoading]);

  const listFeature: ListFeatureType[] = [
    {
      iconName: 'fast-loan-menu-icon',
      title: 'Fast loan',
      goPage: ScreenParamEnum.Simulate,
    },
    {
      iconName: 'cash-loan-icon',
      title: 'Cash loan',
      goPage: ScreenParamEnum.ProductIntroduction,
    },
    {
      iconName: 'credit-card-icon',
      title: 'Credit card',
      goPage: ScreenParamEnum.ProductIntroduction,
    },
    {
      iconName: 'car-loan-icon',
      title: 'Car loan',
      goPage: ScreenParamEnum.ProductIntroduction,
    },
  ];

  const appLoading = useAppSelector(state => state.loading.isLoading);

  const renderHeaderComponent = () => {
    return (
      <>
        {user ? (
          <View>
            <Text>Chào buổi sáng</Text>
            <Text style={tw.style('text-2xl font-semibold')}>
              {user.fullName}
            </Text>
          </View>
        ) : (
          <>
            <Text>{t('Home.welcome')}</Text>
            <Text style={tw.style(`text-2xl font-semibold ${textDanger500}`)}>
              {t('Home.lfvn')}
            </Text>
            <View style={tw.style('flex-row mt-5')}>
              <View style={tw.style('flex-1 mr-3')}>
                <CustomButton onPress={onPressLogin} color={'red'}>
                  {t('Home.login')}
                </CustomButton>
              </View>
              <View style={tw.style('flex-1')}>
                <CustomButton
                  variant="outlined"
                  onPress={onPressSignUp}
                  color={'red'}>
                  {t('Home.registerNow')}
                </CustomButton>
              </View>
            </View>
          </>
        )}
      </>
    );
  };

  return (
    <View style={tw.style('mt-10 mx-4')}>
      {renderHeaderComponent()}
      <View
        style={tw.style(
          'flex-row  bg-white rounded-2xl px-4 py-3 shadow-md mt-8 justify-between',
        )}>
        {listFeature.map((item, index) => (
          <View key={item.title} style={tw`flex-1 items-center`}>
            <TouchableOpacity
              onPress={() => {
                appNavigate(item.goPage);
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
