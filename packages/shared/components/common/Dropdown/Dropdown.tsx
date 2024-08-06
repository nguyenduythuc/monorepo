import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import tw from 'twrnc';
import {BaseModal} from '../AppModal';
import {Icon, Radio} from '@lfvn-customer/shared/components';
import {Label} from '@lfvn-customer/shared/components/common/Label';
import {dropdownOptionProduct} from '../../../types/components/dropdown';

type DropdownProps = {
  label?: string;
  options?: dropdownOptionProduct[];
  onChange: (item: string) => void;
  placeholder?: string;
  value: string;
  disabled?: boolean;
  required?: boolean;
};

export const DropDownSelect = ({
  label,
  options,
  onChange,
  placeholder,
  value,
  disabled = false,
  required = false,
}: DropdownProps) => {
  const listPage = options || [];
  const dropDownRef = useRef<any>(null);

  const handleSelect = (item: string) => {
    dropDownRef.current?.close();
    !!onChange && onChange(item);
  };

  const valueName = () => {
    const optionData = listPage.find(
      item => (item.code || item.productCode) === value,
    );
    return optionData?.name || optionData?.productName;
  };

  const onOpen = () => dropDownRef.current?.open();

  return (
    <View style={tw`mt-4`}>
      <Label title={label} required={false} />
      <TouchableOpacity
        onPress={onOpen}
        style={tw`bg-white border-gray-300 h-14 rounded-lg border px-4 flex-row items-center justify-between`}>
        <Text style={[tw`text-lg`, value === '' && tw`text-gray-400`]}>
          {value !== '' ? valueName() : placeholder}
        </Text>
        <View style={tw`pr-2`}>
          <Icon name="arrow-down" />
        </View>
      </TouchableOpacity>
      <BaseModal ref={dropDownRef}>
        <>
          <View style={tw`py-2 justify-center items-center h-14`}>
            <Text style={tw`font-semibold text-lg`}>{placeholder}</Text>
          </View>
          <ScrollView style={tw``} nestedScrollEnabled={true} bounces={false}>
            {listPage.map((item, index) => (
              <TouchableOpacity
                key={item.productCode || item.code}
                style={[
                  value === (item.productCode || item.code) && tw`bg-gray-100`,
                  index !== listPage.length &&
                    tw`border border-gray-200 rounded-lg`,
                  tw`flex-row justify-between items-center min-w-20 py-1 mx-4 my-1 px-4 h-12`,
                ]}
                onPress={() =>
                  handleSelect(item.productCode || item.code || '')
                }>
                <Text
                  style={[
                    (item.productName || item.name) === value &&
                      tw`text-blue-500`,
                  ]}>
                  {item.productName || item.name}
                </Text>
                {value === (item.productCode || item.code) && (
                  <Icon name="check-circle" color="green"></Icon>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      </BaseModal>
    </View>
  );
};
