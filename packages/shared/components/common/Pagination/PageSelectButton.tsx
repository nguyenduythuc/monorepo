import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import tw from 'twrnc';
import {BaseModal} from '../AppModal';

type DropdownProps = {
  label?: number;
  items: number[];
  onChange: (item: number) => void;
};

export const PageSelectButton: React.FC<DropdownProps> = ({
  label,
  items,
  onChange,
}) => {
  const listPage = items.map(item => item + 1);
  const dropDownRef = useRef<any>(null);

  const handleSelect = (item: number) => {
    dropDownRef.current?.close();
    !!onChange && onChange(item);
  };

  const onOpen = () => dropDownRef.current?.open();

  return (
    <>
      <TouchableOpacity
        onPress={onOpen}
        style={tw`bg-white border-gray-300 min-w-20 h-8 rounded-lg border px-2 flex-row items-center justify-center`}>
        <Text style={tw`text-base`}>{label}</Text>
      </TouchableOpacity>
      <BaseModal ref={dropDownRef}>
        <>
          <View
            style={tw`py-2 justify-center items-center border-b border-gray-300`}>
            <Text style={tw`font-semibold text-lg`}>Select Page</Text>
          </View>
          <ScrollView nestedScrollEnabled={true} bounces={false}>
            {listPage.map(item => (
              <TouchableOpacity
                key={item}
                style={[
                  label === item && tw`bg-blue-200`,
                  item !== listPage.length && tw`border-b border-gray-200`,
                  tw`items-center justify-center min-w-20 py-1 px-4 h-12`,
                ]}
                onPress={() => handleSelect(item)}>
                <Text style={[item === label && tw`text-blue-500`]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      </BaseModal>
    </>
  );
};
