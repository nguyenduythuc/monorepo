import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {TextInputSearch} from '../TextInput';
import {Icon} from '../Icon';
import {autoCompleteData} from '@lfvn-customer/shared/types/services/loanInfoTypes';

type AutoCompleteProps = {
  listResult: autoCompleteData[];
  title?: string;
  searchValue?: string;
  onChange?: (value: string) => void;
  onSelect: (value: number | string, list: autoCompleteData[]) => void;
  addressAuto?: boolean;
};

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  searchValue = '',
  listResult,
  title,
  onChange,
  onSelect,
  addressAuto,
}) => {
  // State to store the input value and filtered list

  const [searchQuery, setSearchQuery] = useState(searchValue);
  const [filteredResults, setFilteredResults] = useState(listResult);

  // Example static list of results
  useEffect(() => {
    setFilteredResults(listResult);
  }, [listResult]);

  // Function to filter the list based on search query
  const getDataList = (query: string) => {
    if (!query) return listResult; // Return full list if no query
    return listResult.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
  };

  // Update filtered results whenever the search query changes
  useEffect(() => {
    if (searchQuery !== '') {
      const timeoutId = setTimeout(() => {
        setFilteredResults(getDataList(searchQuery));
      }, 500); // 300ms debounce delay

      // Clean up the timeout if the query changes before the timeout completes
      return () => clearTimeout(timeoutId);
    } else {
      setFilteredResults(listResult);
    }
  }, [searchQuery]);

  // Handle the value change in TextInputSearch
  const handleSearchChange = (value: string) => {
    setSearchQuery(value); // Update the search query state
    onChange?.(value); // Call the parent onChange callback if provided
  };

  const handleSelect = (id: number | string) => {
    // Handle item selection logic here
    onSelect(id, listResult);
    const selectItem = listResult.filter(item => item._id === id)[0];
    addressAuto ?? setSearchQuery(selectItem.name);
  };

  return (
    <>
      <View style={tw.style('mb-2 ')}>
        <TextInputSearch
          onChangeValue={handleSearchChange}
          value={searchQuery}
        />
        {title && (
          <Text style={tw.style('text-lg font-semibold mt-4')}> {title}</Text>
        )}
      </View>
      <ScrollView style={tw`flex-1`} nestedScrollEnabled={true} bounces={false}>
        {filteredResults.map(item => (
          <TouchableOpacity
            key={item._id}
            style={[
              tw`border-b border-gray-200 `,
              tw`flex-row justify-between items-center py-1 my-1 pr-3`,
            ]}
            onPress={() => handleSelect(item._id)}>
            <View style={tw.style('flex flex-row py-2')}>
              {addressAuto && <Icon name={'address-card-icon'} height={55} />}
              <View style={tw.style('justify-center items-start pl-1')}>
                <Text
                  style={tw`text-black ${addressAuto ? 'font-medium' : ''}  text-base pb-0.5`}>
                  {item.name}
                </Text>
                {item.description && (
                  <Text style={tw`font-light`}>{item.description}</Text>
                )}
              </View>
            </View>
            {addressAuto ?? (
              <Icon name="chevron-right" color="black" height={15} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};
