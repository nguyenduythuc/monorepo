import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {CustomButton, FileOptionModal} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import useVerifyESignForSale from '@lfvn-customer/shared/hooks/useVerifyESignForSale';

const VerifyESignForSaleScreen = () => {
  const {theme} = useGetTheme();
  const {textNegative500} = theme;

  const t = useTranslations();

  const {
    cccdInfo,
    avatarInfo,
    onPressSubmit,
    addressInfo,
    degreeInfo,
    resumeInfo,
    bankInfo,
    setAddressInfo,
    setAvatarInfo,
    setBankInfo,
    setCccdInfo,
    setDegreeInfo,
    setResumeInfo,
    handleOpenFolder,
  } = useVerifyESignForSale();

  return (
    <>
      <ScrollView
        style={tw.style('flex-1 pt-[21px] pb-25 px-4')}
        showsVerticalScrollIndicator={false}>
        <Text
          style={tw.style(`text-2xl font-semibold pb-2 ${textNegative500}`)}>
          {t('VerifyESignForSale.title')}
        </Text>
        <Text style={tw.style(`text-base pb-1 ${textNegative500} mb-2`)}>
          {t('VerifyESignForSale.desc')}
        </Text>
        <FileOptionModal
          doc={cccdInfo}
          setDoc={setCccdInfo}
          handleOpenFolder={handleOpenFolder}
        />
        <FileOptionModal
          doc={avatarInfo}
          setDoc={setAvatarInfo}
          handleOpenFolder={handleOpenFolder}
        />
        <FileOptionModal
          doc={addressInfo}
          setDoc={setAddressInfo}
          handleOpenFolder={handleOpenFolder}
        />
        <FileOptionModal
          doc={degreeInfo}
          setDoc={setDegreeInfo}
          handleOpenFolder={handleOpenFolder}
        />
        <FileOptionModal
          doc={resumeInfo}
          setDoc={setResumeInfo}
          handleOpenFolder={handleOpenFolder}
        />
        <FileOptionModal
          doc={bankInfo}
          setDoc={setBankInfo}
          handleOpenFolder={handleOpenFolder}
        />
      </ScrollView>
      <View style={tw.style('absolute bottom-4 w-full')}>
        <CustomButton
          onPress={onPressSubmit}
          color={'red'}
          buttonStyle={'mt-4 mx-4'}>
          {t('VerifyESignForSale.upload')}
        </CustomButton>
      </View>
    </>
  );
};

export default VerifyESignForSaleScreen;
