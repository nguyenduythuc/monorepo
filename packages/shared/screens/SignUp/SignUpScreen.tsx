import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import useSignUp from '@lfvn-customer/shared/hooks/useSignUp';
import {Checkbox} from '@lfvn-customer/shared/components';

const SignUpScreen = ({t}: {t: any}) => {
  const {theme} = useGetTheme();
  const {textNegative500, bgDanger500} = theme;

  const {renderFrom, onPressSubmit, isAcceptTC, setIsAcceptTC} = useSignUp({t});

  return (
    <View style={tw.style('flex-1')}>
      <View style={tw.style('flex-1 px-4')}>
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
        <TouchableOpacity
          onPress={onPressSubmit}
          disabled={!isAcceptTC}
          style={tw.style(`p-4 mt-4 items-center ${bgDanger500} rounded-10px`)}>
          <Text style={tw.style('text-lg font-semibold text-white')}>
            {t('SignUp.signup')}
          </Text>
        </TouchableOpacity>
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
