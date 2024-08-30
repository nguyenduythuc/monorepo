import React, {useEffect, useState} from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {
  Appbar,
  Checkbox,
  CustomButton,
  Icon,
  Image,
  RadioButton,
} from '@lfvn-customer/shared/components';
import {phoneNFCIcon} from '@lfvn-customer/shared/assets';
import {ScreenParamEnum} from '../../../mobile/src/types/paramtypes';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';

export const VerifyCustomerInfo = () => {
  const t = useTranslations();
  const {appNavigate} = useConfigRouting();

  const submitAction = () => {
    appNavigate(ScreenParamEnum.ReviewCustomerEKYCInfo);
  };
  const [selectedValue, setSelectedValue] = useState('');

  const [confirmTerm, setConfirm] = useState(true);

  const handleSelect = (selectedOption: string) => {
    setSelectedValue(selectedOption);
  };

  const options = [
    {
      label: 'Verify NFC',
      value: 'verifyNFC',
      renderContent: (
        <View style={tw.style('flex-row items-center justify-center py-2')}>
          <View style={tw.style('px-3')}>
            {/* <Icon name="phone-ocr-icon"></Icon> */}
            <Image
              source={{
                android: 'phone_nfc_icon',
                ios: phoneNFCIcon,
                web: '/images/phone_nfc_icon.png',
              }}
              style={tw.style('h-18 w-11')}
            />
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
      label: 'Verify OCR',
      value: 'verifyOCR',
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
      <ScrollView style={tw.style('flex-1')}>
        <View style={tw.style('px-4 my-4')}>
          <Text style={tw.style('text-3xl font-bold')}>
            {t('VerifyCustomer.verifyInfo')}
          </Text>
          <Text style={tw.style('text-base my-3')}>
            {t('VerifyCustomer.verifyInfoDes')}
          </Text>
          <View style={tw`flex flex-col`}>
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
        </View>
      </ScrollView>
      <View style={tw`bg-white px-4 pt-3 pb-4 border-gray-200`}>
        <Checkbox
          size="sm"
          isChecked={confirmTerm}
          onChange={() => setConfirm(!confirmTerm)}
          label={''}
          renderContent={
            <Text style={tw.style('ml-2 text-sm font-normal text-black')}>
              {t('VerifyCustomer.termAgreement1')}
              <TouchableOpacity onPress={() => console.log('commonTerm')}>
                <Text style={tw.style('text-blue-500 font-semibold')}>
                  {t('VerifyCustomer.commonTerm')}
                </Text>
              </TouchableOpacity>

              {t('VerifyCustomer.termAgreement2')}
            </Text>
          }
          color={'red'}
        />
        <CustomButton
          onPress={submitAction}
          disabled={selectedValue === ''}
          color="red">
          {t('VerifyCustomer.startVerify')}
        </CustomButton>
      </View>
    </>
  );
};
