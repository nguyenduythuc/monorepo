import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {
  Appbar,
  CustomButton,
  Icon,
  TextInputSearch,
} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import useListNapasBank from '@lfvn-customer/shared/hooks/useListNapasBank';

const ListNapasBankScreen = () => {
  const t = useTranslations();

  const {
    filterBanks,
    onPressSubmit,
    searchQuery,
    handleSearchChange,
    newBank,
    onPressSelectBank,
  } = useListNapasBank();

  return (
    <View style={tw.style('flex-1 py-4')}>
      <Appbar labelContent={t('CheckNapas.chooseBank')} />
      <TextInputSearch
        onChangeValue={handleSearchChange}
        value={searchQuery}
        containerStyle="px-4"
        placeholder={'CheckNapas.searchBankPlaceholder'}
      />
      <ScrollView style={tw``} nestedScrollEnabled={true} bounces={false}>
        {filterBanks.map((item, index) => (
          <TouchableOpacity
            key={item.code}
            style={[
              newBank.code === item.code && tw`bg-gray-100`,
              index !== filterBanks.length &&
                tw`border border-gray-200 rounded-lg`,
              tw`flex-row justify-between items-center min-w-20 py-1 mx-4 my-1 px-4 h-12`,
            ]}
            onPress={() => onPressSelectBank(item)}>
            <Text style={[item.code === newBank.code && tw`text-blue-500`]}>
              {item.code ?? item.name}
            </Text>
            {newBank.code === item.code && (
              <Icon name="check-circle" color="green"></Icon>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={tw`border-t border-gray-200 bg-white`}>
        <CustomButton
          onPress={onPressSubmit}
          color={'red'}
          buttonStyle={'mt-4 mx-4'}>
          {t('VerifyIdContractESignForSale.continue')}
        </CustomButton>
      </View>
    </View>
  );
};

export default ListNapasBankScreen;
