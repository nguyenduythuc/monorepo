import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {CustomButton, Image} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';

const PrecheckFailScreen = () => {
  const {theme} = useGetTheme();
  const {appNavigate} = useConfigRouting();

  const {textNegative500} = theme;

  const t = useTranslations();

  const onPressGoBack = () => {
    appNavigate(ScreenParamEnum.Home);
  };

  return (
    <View style={tw.style('flex-1 px-4')}>
      <Image iconName="precheck_fail_icon" style={styles.imgLogo} />
      <View style={tw.style('flex-1')}>
        <Text
          style={tw.style(
            `text-[28px] ${textNegative500} font-semibold mt-6 text-center`,
          )}>
          {t('PrecheckFail.title')}
        </Text>
        <Text style={tw.style(`text-lg ${textNegative500} mt-3 text-center`)}>
          {t('PrecheckFail.desc', {
            phoneContact: '1900 6866',
          })}
        </Text>
      </View>
      <CustomButton onPress={onPressGoBack} color="red">
        {t('PrecheckFail.goHome')}
      </CustomButton>
    </View>
  );
};

export default PrecheckFailScreen;

const styles = StyleSheet.create({
  imgLogo: {
    width: '100%',
    height: 170,
    marginTop: 80,
    marginLeft: 16,
    alignSelf: 'center',
  },
});
