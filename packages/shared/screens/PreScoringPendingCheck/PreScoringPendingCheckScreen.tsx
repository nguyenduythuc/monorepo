import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {Image} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import usePreScoringPendingCheck from '@lfvn-customer/shared/hooks/usePreScoringPendingCheck';

const PreScoringPendingCheckScreen = () => {
  const {theme} = useGetTheme();
  const {textNegative500} = theme;

  const t = useTranslations();

  usePreScoringPendingCheck();

  return (
    <View style={tw.style('flex-1 items-center pt-[80px]')}>
      <Image iconName="coin" style={styles.imgLogo} type="gif" />
      <View style={tw.style('px-4')}>
        <Text
          style={tw.style(
            `text-[28px] ${textNegative500} font-semibold mt-6 text-center`,
          )}>
          {t('Precheck.title')}
        </Text>
        <Text style={tw.style(`text-lg ${textNegative500} mt-3 text-center`)}>
          {t('Precheck.desc')}
        </Text>
      </View>
    </View>
  );
};

export default PreScoringPendingCheckScreen;

const styles = StyleSheet.create({
  imgLogo: {
    width: 159,
    height: 133,
    marginTop: 32,
    marginLeft: 16,
  },
});
