import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import useSignUp from '@lfvn-customer/shared/hooks/useSignUp';
import {Checkbox, CustomButton} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';

const SignUpScreen = () => {
  const t = useTranslations();
  const {theme} = useGetTheme();
  const {textNegative500, bgDanger500} = theme;

  const {renderFrom, onPressSubmit, isAcceptTC, setIsAcceptTC, isLoading} =
    useSignUp();

  return (
    <View style={tw.style('flex-1')}>
      <View style={tw.style('px-4')}>
        <Text
          style={tw.style(`text-32px ${textNegative500} font-semibold mt-6`)}>
          {t('SignUp.title')}
        </Text>
        <Text style={tw.style(`text-lg ${textNegative500} mt-2`)}>
          {t('SignUp.desc')}
        </Text>
      </View>
      <View style={tw.style('mx-4')}>
        {renderFrom()}
        <CustomButton
          onPress={onPressSubmit}
          color={'red'}
          buttonStyle={'mt-4'}
          disabled={!isAcceptTC}
          loading={isLoading}>
          {t('SignUp.signup')}
        </CustomButton>
        <View style={tw.style('flex-row mt-8 items-center')}>
          <Checkbox
            isChecked={isAcceptTC}
            onChange={newValue => setIsAcceptTC(Boolean(newValue))}
            label={t('SignUp.readAndAgree')}
            color={'red'}
          />
          {/* <View style={tw.style('flex-row ml-2 flex-1 items-center')}>
            <Text style={tw.style(`text-base ${textNegative500}`)}>
              {t('SignUp.readAndAgree')}
            </Text>
            <Text style={tw.style(`text-base font-semibold ${textUseful500}`)}>
              {` ${t('SignUp.conditional')} `}
            </Text>
            <Text style={tw.style(`text-base ${textNegative500}`)}>
              {t('SignUp.useService')}
            </Text>
          </View> */}
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  imgLogo: {
    width: 120,
    height: 120,
    marginTop: 16,
  },
});
