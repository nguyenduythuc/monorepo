import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {CustomButton, UploadFileButton} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import useUploadDocsESignForSale from '@lfvn-customer/shared/hooks/useUploadDocsESignForSale';

const UploadDocsESignForSaleScreen = () => {
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
    handleOpenFolder,
  } = useUploadDocsESignForSale();

  return (
    <>
      <ScrollView
        style={tw.style('flex-1 pt-[21px] pb-25 px-4')}
        showsVerticalScrollIndicator={false}>
        <Text
          style={tw.style(`text-2xl font-semibold pb-2 ${textNegative500}`)}>
          {t('UploadDocsESignForSale.title')}
        </Text>
        <Text style={tw.style(`text-base pb-1 ${textNegative500} mb-2`)}>
          {t('UploadDocsESignForSale.desc')}
        </Text>
        <UploadFileButton
          doc={cccdInfo}
          onPress={() =>
            handleOpenFolder({
              doc: cccdInfo,
            })
          }
        />
        <UploadFileButton
          doc={avatarInfo}
          onPress={() =>
            handleOpenFolder({
              doc: avatarInfo,
            })
          }
        />
        <UploadFileButton
          doc={addressInfo}
          onPress={() =>
            handleOpenFolder({
              doc: addressInfo,
            })
          }
        />
        <UploadFileButton
          doc={degreeInfo}
          onPress={() =>
            handleOpenFolder({
              doc: degreeInfo,
            })
          }
        />
        <UploadFileButton
          doc={resumeInfo}
          onPress={() =>
            handleOpenFolder({
              doc: resumeInfo,
            })
          }
        />
        <UploadFileButton
          doc={bankInfo}
          onPress={() =>
            handleOpenFolder({
              doc: bankInfo,
            })
          }
        />
      </ScrollView>
      <View style={tw.style('absolute bottom-4 w-full')}>
        <CustomButton
          onPress={() => onPressSubmit([])}
          color={'red'}
          buttonStyle={'mt-4 mx-4'}>
          {t('UploadDocsESignForSale.upload')}
        </CustomButton>
      </View>
    </>
  );
};

export default UploadDocsESignForSaleScreen;
