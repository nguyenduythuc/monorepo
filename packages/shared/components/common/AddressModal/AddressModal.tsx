import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Platform} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {BaseModal} from '../AppModal';
import {Icon} from '../Icon';
import {Label} from '../Label';
import {autoCompleteData} from '@lfvn-customer/shared/types/services/loanInfoTypes';
import {AddManualAddress} from './AddManualAddress';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {AddAutoAddress} from './AddAutoAddress';

type AddressModalProps = {
  label?: string;
  onChange: (value: string) => void;
  value: string;
};

export const AddressModal: React.FC<AddressModalProps> = ({
  label,
  onChange,
  value,
}) => {
  const t = useTranslations();

  const autoAddressModalRef = useRef<any>(null);

  const [addressAuto, setAddressType] = useState(true);
  const [address, setAddress] = useState(t('AddAddress.inputAddress'));

  const onOpen = () => autoAddressModalRef.current?.open();
  const onCloseAutoAddress = () => autoAddressModalRef.current?.close();

  const listAddress: autoCompleteData[] = [
    {
      _id: 1,
      name: 'Lotte Center Hà Nội',
      description: '54 Liễu Giai, Cống Vị, Ba Đình, Hà Nội',
      code: '1',
    },
    {
      _id: 2,
      name: 'Test 1',
      description: '54 Liễu Giai, Cống Vị, Ba Đình, Hà Nội',
      code: '2',
    },
    {
      _id: 3,
      name: 'Test 2',
      description: '54 Liễu Giai, Cống Vị, Ba Đình, Hà Nội',
      code: '3',
    },
    {
      _id: 4,
      name: 'Test 3',
      description: '54 Liễu Giai, Cống Vị, Ba Đình, Hà Nội',
      code: '4',
    },
  ];

  const fillAddress = (type: string, value?: string) => {
    if (type === 'submit') {
      onChange(value || '');
      onCloseAutoAddress();
    } else {
      onChange(t('AddAddress.inputAddress'));
    }
  };

  return (
    <>
      <Label title={'AddAddress.address'} />

      <TouchableOpacity
        onPress={onOpen}
        style={[
          tw`bg-white border-gray-300 h-14 rounded-lg border px-4 flex-row items-center justify-between`,
        ]}>
        <View style={tw`pr-2 flex-row justify-center items-center`}>
          <Text style={[tw`text-lg`]}>{value}</Text>
        </View>

        <View style={tw`pr-2`}>
          <Icon name="chevron-right" color="gray" />
        </View>
      </TouchableOpacity>
      <BaseModal ref={autoAddressModalRef} disabled>
        <View
          style={tw.style(
            `bg-white border border-gray-300 bottom-0 rounded-t-2xl pt-10 h-full w-full pb-6`,
            {position: Platform.OS === 'web' ? 'fixed' : 'absolute'},
          )}>
          <View
            style={tw`relative flex-row w-full h-14 items-center px-4 py-2 bg-transparent`}>
            <View style={tw`items-start `}>
              <TouchableOpacity
                onPress={() => onCloseAutoAddress()}
                style={tw`flex-row items-center`}>
                <Icon name="arrow-left" color="black" disabled></Icon>
              </TouchableOpacity>
            </View>
            <View
              style={tw`inset-x-20 flex justify-center absolute self-center items-center`}>
              <Text style={tw`font-semibold text-lg`}>
                {t('AddAddress.address')}
              </Text>
            </View>
            <View style={tw`flex-1 justify-end items-end`}>
              <TouchableOpacity
                onPress={() => setAddressType(!addressAuto)}
                style={tw`flex-row items-center`}>
                <Text style={[tw`text-blue-500`]}>
                  {addressAuto
                    ? t('VerifyCustomer.manual')
                    : t('VerifyCustomer.auto')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {addressAuto ? (
            <AddAutoAddress
              onChange={onChange}
              listAutoAddress={listAddress}
              value={value === t('AddAddress.inputAddress') ? '' : value}
              changeMode={() => setAddressType(!addressAuto)}
              autoSubmit={fillAddress}
            />
          ) : (
            <AddManualAddress value={address} manualSubmit={fillAddress} />
          )}
        </View>
      </BaseModal>
    </>
  );
};
