import React, {useState} from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {View, Text, TouchableOpacity, ScrollView, Platform} from 'react-native';
import {
  Appbar,
  Checkbox,
  CustomButton,
  FileOptionModal,
  Icon,
  Image,
  RadioButton,
} from '@lfvn-customer/shared/components';
import useRNTrueId from '@lfvn-customer/shared/hooks/useRNTrueId';
import {EkycType} from '@lfvn-customer/shared/utils/TrueId';

export const VerifyCustomerInfo = () => {
  const t = useTranslations();

  const [selectedValue, setSelectedValue] = useState(EkycType.NFC);

  const [confirmTerm, setConfirm] = useState(true);

  const handleSelect = (selectedOption: EkycType) => {
    setSelectedValue(selectedOption);
  };

  const {submitAction} = useRNTrueId();
  const options = [
    {
      label: t('VerifyCustomer.screenNFC'),
      value: EkycType.NFC,
      renderContent: (
        <View style={tw.style('flex-row items-center justify-center py-2')}>
          <View style={tw.style('px-3')}>
            {/* <Icon name="phone-ocr-icon"></Icon> */}
            <Image iconName="phone_nfc_icon" style={tw.style('h-18 w-11')} />
          </View>
          <View style={tw.style('flex-col flex-1')}>
            <View style={tw.style('flex-row items-center mb-1.5')}>
              <Text style={tw.style('text-lg font-semibold text-red-500')}>
                {t('VerifyCustomer.screenNFC') + ' '}
              </Text>
              <Text style={tw.style('text-lg mr-2')}>
                {t('VerifyCustomer.recommend')}
              </Text>
              <Icon name="info-icon" size={18} color="#2F6BFF" disabled />
            </View>
            <Text>{t('VerifyCustomer.screenNFCDes')}</Text>
          </View>
        </View>
      ),
    },
    {
      label: t('VerifyCustomer.screenOCR'),
      value: EkycType.OCR,
      renderContent: (
        <View style={tw.style('flex-row items-center justify-center py-2')}>
          <View style={tw.style('px-3')}>
            <Icon name="phone-ocr-icon"></Icon>
          </View>
          <View style={tw.style('flex-col flex-1')}>
            <View style={tw.style('flex-row items-center mb-1.5')}>
              <Text style={tw.style('text-lg font-semibold text-red-500 mr-2')}>
                {t('VerifyCustomer.screenOCR')}
              </Text>

              <Icon name="info-icon" size={18} color="#2F6BFF" disabled />
            </View>

            <Text>{t('VerifyCustomer.screenOCRDes')}</Text>
          </View>
        </View>
      ),
    },
  ];

  return (
    <>
      <Appbar />
      <View style={tw.style('flex-1')}>
        <View style={tw.style('flex-1 px-4 my-4')}>
          <View style={tw.style('')}>
            <Text style={tw.style('text-3xl font-bold')}>
              {t('VerifyCustomer.verifyInfo')}
            </Text>
            <Text style={tw.style('text-base my-3')}>
              {t('VerifyCustomer.verifyInfoDes')}
            </Text>

            <ScrollView>
              {Platform.OS !== 'web' ? (
                <View style={tw`flex-col`}>
                  {options.map(option => (
                    <RadioButton
                      renderContent={option.renderContent}
                      color="red"
                      key={option.value}
                      label={option.label}
                      selected={selectedValue === option.value}
                      onPress={() => handleSelect(option.value)}
                    />
                  ))}
                </View>
              ) : (
                <View
                  style={tw.style(
                    'border-[1px] border-red-500 rounded-lg px-3 py-2',
                  )}>
                  {options[1].renderContent}
                </View>
              )}
              <View style={tw`flex-row items-center gap-3 justify-between`}>
                {options.map((option, index) => (
                  <RadioButton
                    // renderContent={option.renderContent}

                    color="red"
                    key={option.value}
                    label={option.label}
                    selected={selectedValue === option.value}
                    onPress={() => handleSelect(option.value)}
                  />
                ))}
              </View>
              <View style={tw.style('flex flex-row')}>
                <FileOptionModal />
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={tw`bg-white px-4 pt-3 pb-4 border-gray-200`}>
          <Checkbox
            size="sm"
            isChecked={confirmTerm}
            onChange={() => setConfirm(!confirmTerm)}
            label={''}
            renderContent={
              <Text style={tw.style('ml-2 text-sm  font-normal text-black')}>
                {t('VerifyCustomer.termAgreement1')}
                <TouchableOpacity
                  style={tw.style('flex-1 justify-end')}
                  onPress={() => console.log('commonTerm')}>
                  <Text
                    style={tw.style('text-blue-500 text-end font-semibold')}>
                    {t('VerifyCustomer.commonTerm')}
                  </Text>
                </TouchableOpacity>

                {t('VerifyCustomer.termAgreement2')}
              </Text>
            }
            color={'red'}
          />
          <CustomButton onPress={() => submitAction(selectedValue)} color="red">
            {t('VerifyCustomer.startVerify')}
          </CustomButton>
        </View>
      </View>
    </>
  );
};
