import {
  CheckButton,
  Checkbox,
  CustomButton,
  CustomTable,
  CustomTableProps,
  Radio,
  RadioButton,
  RadioGroup,
  RoundButton,
  SwitchCustom,
} from '@lfvn-customer/shared/components';
import React, {useMemo} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';

const ComponentScreen = () => {
  const [selectedValue, setSelectedValue] = React.useState('');

  const headers = ['Id', 'Name', 'Age', 'Job', 'Address', 'Action'];

  const addressDefault = 'Ba Dinh, Hanoi, Vietnam';

  const tableData = [
    {
      id: '1',
      name: 'John',
      age: '22',
      job: 'DEV',
      address: addressDefault,
      showDetail: {
        type: 'action',
        styleWrapper: 'flex flex-row',
        props: [
          {
            label: 'abc',
            size: 'sm',
            color: 'green',
            variant: 'outlined',
          },
        ],
      },
    },
    {
      id: '2',
      name: 'John',
      age: '22',
      job: 'DEV',
      address: addressDefault,
      showDetail: {
        type: 'action',
        styleWrapper: 'flex-row',
        props: [
          {
            label: 'abc',
            size: 'sm',
            color: 'green',
            variant: 'outlined',
          },
        ],
      },
    },
    {
      id: '3',
      name: 'John',
      age: '22',
      job: 'DEV',
      address: addressDefault,
      showDetail: {
        type: 'action',
        styleWrapper: 'flex-row',
        props: [
          {
            label: 'abc',
            size: 'sm',
            color: 'green',
            variant: 'outlined',
          },
        ],
      },
    },
    {
      id: '4',
      name: 'John',
      age: '22',
      job: 'DEV',
      address: addressDefault,
      showDetail: {
        type: 'action',
        styleWrapper: 'flex-row',
        props: [
          {
            label: 'abc',
            size: 'sm',
            color: 'green',
            variant: 'outlined',
          },
        ],
      },
    },
    {
      id: '5',
      name: 'John',
      age: '22',
      job: 'DEV',
      address: addressDefault,
      showDetail: {
        type: 'action',
        styleWrapper: 'flex-row',
        props: [
          {
            label: 'abc',
            size: 'sm',
            color: 'green',
            variant: 'outlined',
          },
        ],
      },
    },
  ];

  const tableProps: CustomTableProps = useMemo(() => {
    return {
      headers: headers,
      data: tableData.map(data => ({
        id: data.id,
        rawData: data,
        data: [
          data.id,
          data.name,
          data.age,
          data.job,
          data.address,
          data.showDetail,
        ],
      })),
      columnWidth: [60, 80, 160, 100, 220, 120],
      columnStyles: ['underline font-bold', 'font-bold'],
      onRowPress: rowData => {
        console.log('RowData123', rowData.rawData);
      },
      fixedLeftColumn: true,
      // fixedRightColumn: true,
      // hasAction: true,
    };
  }, [tableData, headers]);

  const handleSelect = (selectedOption: string) => {
    console.log('Selected option:', selectedOption);
    setSelectedValue(selectedOption);
  };

  const listCheck = [
    {label: 'Select 1', value: 'select1', isChecked: false},
    {label: 'Select 2', value: 'select2', isChecked: false},
    {label: 'Select 3', value: 'select3', isChecked: false},
  ];

  const handleSelectCheckBox = (selectedOption: string) => {
    console.log('Selected checkbox:', selectedOption);
    // setSelectedValue(selectedOption);
  };
  const options = [
    {label: 'Option 1', value: 'option1'},
    {label: 'Option 2', value: 'option2'},
    {label: 'Option 3', value: 'option3'},
  ];

  return (
    <View style={tw.style('flex-1')}>
      <SafeAreaView style={tw.style('flex-1')}>
        <ScrollView>
          <View style={tw`px-4`}>
            <View style={tw`my-2`}>
              <CustomButton color="red" variant="text">
                Continue
              </CustomButton>
              <CustomButton color="red" prefixIcon="add-icon" iconColor="white">
                Continue
              </CustomButton>
            </View>

            <View style={tw`my-2`}>
              <CustomButton
                variant="link"
                onPress={() => console.log('Continue')}>
                Continue
              </CustomButton>
              <CustomButton
                variant="outlined"
                prefixIcon="add-icon"
                iconColor="blue">
                Continue
              </CustomButton>
            </View>

            <View style={tw`my-2`}>
              <RoundButton prefixIcon="add-file-icon" />
            </View>

            <View style={tw`flex flex-row my-2`}>
              {listCheck.map(option => (
                <Checkbox
                  key={option.value}
                  size="lg"
                  label={option.label}
                  isChecked={option.isChecked}
                  onChange={() => handleSelectCheckBox(option.label)}
                  color="blue"></Checkbox>
              ))}
            </View>
            <View style={tw`flex flex-row my-2`}>
              {listCheck.map(option => (
                <CheckButton
                  prefixIcon="close-circle"
                  key={option.value}
                  size="xl"
                  label={option.label}
                  isChecked={option.isChecked}
                  onChange={() => handleSelectCheckBox(option.label)}
                  color="blue"></CheckButton>
              ))}
            </View>
            <View style={tw`flex-1 justify-center p-5 bg-gray-100`}>
              <Text style={tw`text-xl mb-5`}>Select an option:</Text>
              <View style={tw`flex flex-row`}>
                {options.map(option => (
                  <Radio
                    color="green"
                    key={option.value}
                    label={option.label}
                    selected={selectedValue === option.value}
                    onPress={() => setSelectedValue(option.value)}
                  />
                ))}
              </View>
              <RadioGroup
                listStyle={'col'}
                options={options}
                onSelect={handleSelect}
              />
              <View style={tw`flex flex-row`}>
                {options.map(option => (
                  <RadioButton
                    color="green"
                    key={option.value}
                    label={option.label}
                    selected={selectedValue === option.value}
                    onPress={() => setSelectedValue(option.value)}
                  />
                ))}
              </View>
              <View style={tw`flex flex-row`}>
                <SwitchCustom color="green" size="lg"></SwitchCustom>
              </View>
              <Text style={tw`mt-5 text-lg`}>
                Selected Value: {selectedValue}
              </Text>
            </View>
            <View style={tw`mt-10`}>
              <Text style={tw`mb-4`}>Data Table Component Example</Text>
              <CustomTable {...tableProps}></CustomTable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ComponentScreen;
