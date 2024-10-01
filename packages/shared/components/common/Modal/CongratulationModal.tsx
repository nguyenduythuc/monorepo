import React, {useRef} from 'react';
import {ICongratulationModalProps} from '@lfvn-customer/shared/types';
import {View, Text, StyleSheet} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {BaseModal, CustomButton, Image} from '..';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';

export const CongratulationModal: React.FC<ICongratulationModalProps> = ({
  visible,
  setVisible,
  onButtonAgreePress,
  onButtonCancelPress,
  loanAmount,
  interestRate,
}) => {
  const {theme} = useGetTheme();
  const {textDanger500, bgNegative100} = theme;

  const dropDownRef = useRef<any>(null);
  const onOpen = () => dropDownRef.current?.open();
  const onClose = () => {
    setVisible && setVisible(false);
    dropDownRef.current?.close();
  };
  const t = useTranslations();

  if (visible) {
    onOpen();
  } else {
    onClose();
  }

  return (
    <BaseModal ref={dropDownRef} disabled>
      <View
        style={tw.style('flex items-center justify-center w-full h-full px-4')}>
        <View
          style={tw.style(
            'bg-white items-center rounded-2xl w-full py-5 px-5',
          )}>
          <Image iconName="congratulations_icon" style={styles.imgLogo} />
          <Text style={tw.style('text-xl font-semibold text-center')}>
            {t('CongratulationModal.congratulation')}
          </Text>
          <Text style={tw.style('text-lg text-center')}>
            {t('CongratulationModal.title')}
          </Text>
          <Text
            style={tw.style(
              `text-[32px] font-semibold text-center leading-10 ${textDanger500}`,
            )}>
            {`${loanAmount} VND`}
          </Text>
          <Text style={tw.style('text-lg text-center')}>
            {t('CongratulationModal.desc', {
              percent: interestRate,
            })}
          </Text>
          <View style={tw.style(`w-full mt-4 ${bgNegative100} h-[1px]`)} />
          <View style={tw.style('mt-4 w-full')}>
            <CustomButton
              onPress={onButtonAgreePress || onClose}
              buttonStyle={'bg-[#E7252B] shadow-none mb-2'}
              textCustomStyle={'text-white'}>
              {t('CongratulationModal.agree')}
            </CustomButton>
            <CustomButton
              buttonStyle={'bg-[#FFECEE] shadow-none'}
              textCustomStyle={'text-[#E7252B]'}
              onPress={onButtonCancelPress || onClose}
              color="blue">
              {t('CongratulationModal.cancel')}
            </CustomButton>
          </View>
        </View>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  imgLogo: {
    width: 167,
    height: 150,
  },
});
