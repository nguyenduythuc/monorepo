import React, {useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {CustomButton} from '../Button';
import {autoCompleteData} from '@lfvn-customer/shared/types/services/loanInfoTypes';
import {AutoComplete} from '../AutoComplete';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {Icon} from '../Icon';
import useAddAddress from '@lfvn-customer/shared/hooks/useAddAddress';

type AutoAddressModalProps = {
  value?: string;
  changeMode: () => void;
  autoSubmit: (value: string) => void;
  listAutoAddress: autoCompleteData[];
  onChange: (value: string) => void;
};

export const AddAutoAddress: React.FC<AutoAddressModalProps> = ({
  value,
  changeMode,
  autoSubmit,
  listAutoAddress,
  onChange,
}) => {
  const t = useTranslations();
  const {getNewResultList, autoAddressList} = useAddAddress();
  const selectFromResult = (
    value: number | string,
    list: autoCompleteData[],
  ) => {
    const selectedAddress = list.filter(item => item._id === value)[0];
    autoSubmit(selectedAddress.name);
  };

  useEffect(() => {
    getNewResultList(value || '');
  }, [value]);

  return (
    <>
      <View style={tw.style('flex-1 mx-4')}>
        <AutoComplete
          onChange={onChange}
          addressAuto={true}
          searchValue={value}
          listResult={
            autoAddressList.length !== 0 ? autoAddressList : listAutoAddress
          }
          onSelect={selectFromResult}
        />
      </View>
      <View
        style={tw.style(
          'flex justify-center items-center rounded-xl pt-3 bg-blue-50 mx-4',
        )}>
        <Icon name="search" size={40}></Icon>
        <Text>{t('AddAddress.notFoundAddress')}</Text>
        <CustomButton
          iconColor="blue"
          prefixIcon="add-icon"
          variant="text"
          onPress={changeMode}>
          {t('AddAddress.addAddressManual')}
        </CustomButton>
      </View>
    </>
  );
};
