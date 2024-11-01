import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Platform} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {BaseModal} from '../AppModal';
import {Icon} from '@lfvn-customer/shared/components';
import {Label} from '@lfvn-customer/shared/components/common/Label';
import {dropdownOptionProduct} from '@lfvn-customer/shared/types/components/dropdown';
import {TextError} from '../TextError';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';

type DropdownProps = {
  label?: string;
  options: dropdownOptionProduct[];
  onChange: (item: string) => void;
  placeholder?: string;
  value: string;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string;
  defaultValue?: string | never[];
  leftComponent?: React.ReactNode;
};

const isWeb = Platform.OS === 'web';

export const DropDownSelect = ({
  label,
  options,
  onChange,
  placeholder,
  value,
  errorMessage,
  defaultValue,
  leftComponent,
  disabled = false,
  required = false,
}: DropdownProps) => {
  const listPage: dropdownOptionProduct[] = 'data' in options ? options.data as dropdownOptionProduct[] : options || [];

  const dropDownRef = useRef<any>(null);
  const t = useTranslations();

  const handleSelect = (item: string) => {
    dropDownRef.current?.close();
    !!onChange && onChange(item);
  };

  const valueName = () => {
    const optionData = value
      ? listPage.find(item => (item.code ?? item.productCode) === value)
      : listPage.find(item => (item.code ?? item.productCode) === defaultValue);

    return optionData?.name ?? optionData?.productName;
  };

  const onOpen = () => dropDownRef.current?.open();

  return (
    <View style={tw`mt-4`}>
      <Label title={label} required={required} />
      <TouchableOpacity
        disabled={disabled}
        onPress={onOpen}
        style={[
          tw`bg-white border-gray-300 h-14 rounded-lg border px-4 flex-row items-center justify-between`,
          !!errorMessage && tw`border-red-300`,
        ]}>
        <View style={tw`pr-2 flex-row justify-center items-center`}>
          {leftComponent && (
            <View style={tw.style('mr-2')}>{leftComponent}</View>
          )}

          <Text style={[tw`text-lg`, value === '' && tw`text-gray-400`]}>
            {value !== '' ? valueName() : defaultValue}
          </Text>
        </View>

        <View style={tw`pr-2`}>
          <Icon name="arrow-down" />
        </View>
      </TouchableOpacity>
      <TextError title={errorMessage} />

      <BaseModal ref={dropDownRef}>
        <>
          <View
            style={tw.style(
              `bg-white border border-gray-300 bottom-0 rounded-t-2xl max-h-96 w-full pb-6`,
              {position: isWeb ? 'fixed' : 'absolute'},
            )}>
            {(placeholder || label) && (
              <View style={tw`py-2 justify-center items-center h-14`}>
                <Text style={tw`font-semibold text-lg`}>
                  {t(placeholder || label)}
                </Text>
              </View>
            )}
            <ScrollView style={tw``} nestedScrollEnabled={true} bounces={false}>
              {listPage.map((item, index) => (
                <TouchableOpacity
                  key={item.productCode ?? item.name}
                  style={[
                    (value || defaultValue) ===
                      (item.productCode ?? item.code) && tw`bg-gray-100`,
                    index !== listPage.length &&
                      tw`border border-gray-200 rounded-lg`,
                    tw`flex-row justify-between items-center min-w-20 py-1 mx-4 my-1 px-4 h-12`,
                  ]}
                  onPress={() =>
                    handleSelect(item.productCode ?? item.code ?? '')
                  }>
                  <Text
                    style={[
                      (item.productName ?? item.name) === value &&
                        tw`text-blue-500`,
                    ]}>
                    {item.productName ?? item.name}
                  </Text>
                  {(value || defaultValue) ===
                    (item.productCode ?? item.code) && (
                    <Icon name="check-circle" color="green"></Icon>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </>
      </BaseModal>
    </View>
  );
};
