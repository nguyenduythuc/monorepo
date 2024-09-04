import {
  Linking,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {
  CustomButton,
  Icon,
  IconKeys,
  Image,
} from '@lfvn-customer/shared/components';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';
import {useGetMetadataQuery} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useDispatch} from 'react-redux';
import {setSimulate} from '@lfvn-customer/shared/redux/slices/publicSlices';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import useHome from '@lfvn-customer/shared/hooks/useHome';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import BgInProgressApplication from '@lfvn-customer/shared/assets/images/svg/BgInProgressApplication';
import {setDeeplinkPath} from '@lfvn-customer/shared/redux/slices/authSlice';
import {transformUniversalToNative} from '../../utils/deeplink';

export type ListFeatureType = {
  iconName: IconKeys;
  title: string;
  goPage: ScreenParamEnum;
};

export const HomeScreen = () => {
  const t = useTranslations();
  const {appNavigate} = useConfigRouting();
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();

  const {user, deeplinkPath} = useAppSelector(state => state.auth);

  const {theme, colors} = useGetTheme();
  const {textDanger500, textNegative300, borderNegative100} = theme;

  const {onPressLogin, onPressSignUp} = useHome();

  const {data: metaData, isLoading: metadataLoading} = useGetMetadataQuery();

  const deeplinkProcessedRef = useRef(false); // Use ref to avoid re-renders

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
      goPage: ScreenParamEnum.VerifyCustomerInfo,
    },
    {
      iconName: 'car-loan-icon',
      title: 'Car loan',
      goPage: ScreenParamEnum.SuccessAccountRegister,
    },
  ];

  useEffect(() => {
    Linking.getInitialURL().then(url => {
      if (url) {
        dispatch(setDeeplinkPath(transformUniversalToNative(url)));
        deeplinkProcessedRef.current = true;
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = Linking.addEventListener('url', ({url}) => {
      if (url) {
        dispatch(setDeeplinkPath(transformUniversalToNative(url)));
        deeplinkProcessedRef.current = true;
      }
    });
    return () => {
      unsubscribe.remove();
    };
  }, []);

  useEffect(() => {
    if (deeplinkPath && deeplinkProcessedRef.current) {
      if (!user) {
        onPressLogin();
      } else {
        // we have to wait link recheck from not authen to authen
        setTimeout(() => {
          Linking.openURL(deeplinkPath);
          deeplinkProcessedRef.current = false;
        }, 600);
      }
    }
  }, [deeplinkPath, user]);

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

  // TODO: Pending request component
  const renderInProgressApplication = () => {
    return (
      <View
        style={tw.style('bg-white shadow-md rounded-2xl py-1', {
          width: width - 32,
        })}>
        <View
          style={{
            height: 116,
            marginLeft: 4,
          }}>
          <BgInProgressApplication
            width={width - 40}
            height={116}
            viewBox={`0 0 ${width - 40} 116`}
          />
          <View
            style={tw.style(
              'absolute flex-row justify-center items-center rounded-2xl',
              {
                height: 116,
                width: width - 40,
              },
            )}>
            <View style={tw.style('flex-1 justify-center items-center')}>
              <Text
                style={tw.style(
                  'text-white text-sm font-semibold text-center',
                )}>
                {t('Home.haveAnProgressApplication')}
              </Text>
              <View style={tw.style('bg-white py-2 px-5 rounded-[100px] mt-3')}>
                <Text
                  style={tw.style(
                    `text-[28px] font-semibold ${textDanger500}`,
                  )}>
                  50.000.000 đ
                </Text>
              </View>
            </View>
            <Image
              iconName="pending_icon"
              style={{
                width: 88,
                height: 85,
              }}
            />
          </View>
        </View>
        <View
          style={tw.style(`py-3 flex-row border-b ${borderNegative100} mx-4`)}>
          <View style={tw.style('flex-1')}>
            <Text style={tw.style(`text-sm font-semibold ${textNegative300}`)}>
              {t('Home.product')}
            </Text>
            <Text style={tw.style(`text-lg font-medium`)}>Salary base</Text>
          </View>
          <View style={tw.style('flex-1 items-center')}>
            <Text style={tw.style(`text-sm font-semibold ${textNegative300}`)}>
              {t('Home.tenor')}
            </Text>
            <Text style={tw.style(`text-lg font-medium`)}>24 months</Text>
          </View>
          <View style={tw.style('flex-1 items-end')}>
            <Text style={tw.style(`text-sm font-semibold ${textNegative300}`)}>
              {t('Home.createdOn')}
            </Text>
            <Text style={tw.style(`text-lg font-medium`)}>Jul 20th</Text>
          </View>
        </View>
        <View style={tw.style(``)} />
        <TouchableOpacity
          style={tw.style('flex-row justify-center my-3 items-center')}
          onPress={() => {}}>
          <Text style={tw.style(`text-lg font-semibold mr-1 ${textDanger500}`)}>
            {t('Home.continue')}
          </Text>
          <Icon name="arrow-right" color={colors['danger-500']} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={tw.style('mt-10 mx-4')}>
      {/* {renderInProgressApplication()} */}
      {renderHeaderComponent()}
      <View
        style={tw.style(
          'flex-row  bg-white rounded-2xl px-4 py-3 shadow-md mt-8 justify-between',
        )}>
        {listFeature.map(item => (
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
