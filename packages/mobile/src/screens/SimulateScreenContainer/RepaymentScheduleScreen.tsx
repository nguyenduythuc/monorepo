import {
  Appbar,
  AppbarAction,
  AppbarBackAction,
  AppbarContent,
  CustomButton,
  CustomTable,
  CustomTableProps,
  Icon,
} from '@lfvn-customer/shared/components';
import {useNavigation} from '@react-navigation/native';
import {useMemo} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import React from 'react';
import {PrimaryNavigatorNavigationProp} from '../../navigators/RootNavigator';
import {useConfigRouting} from '@lfvn-customer/shared/hooks/routing';
import {useTranslations} from 'use-intl';

export const RepaymentScheduleScreen = () => {
  const navigation = useNavigation<PrimaryNavigatorNavigationProp>();
  const t = useTranslations();
  const headers = ['Id', 'Name', 'Age', 'Job', 'Address', 'Action'];

  const tableData = [
    {
      id: '1',
      name: 'John',
      age: '22',
      job: 'DEV',
      address: 'Ba Dinh, Hanoi, Vietnam',
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
      id: '1',
      name: 'John',
      age: '22',
      job: 'DEV',
      address: 'Ba Dinh, Hanoi, Vietnam',
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
      id: '1',
      name: 'John',
      age: '22',
      job: 'DEV',
      address: 'Ba Dinh, Hanoi, Vietnam',
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
      id: '1',
      name: 'John',
      age: '22',
      job: 'DEV',
      address: 'Ba Dinh, Hanoi, Vietnam',
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
      id: '1',
      name: 'John',
      age: '22',
      job: 'DEV',
      address: 'Ba Dinh, Hanoi, Vietnam',
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
      //   fixedLeftColumn: true,
      // fixedRightColumn: true,
      // hasAction: true,
    };
  }, [tableData, headers]);

  const {appNavigate} = useConfigRouting();

  return (
    <View>
      <SafeAreaView style={tw`bg-white h-screen`}>
        <Appbar
          backAction
          backIconColor="black"
          labelContent={''}
          contentTextStyle={tw.style('text-black')}
        />
        <ScrollView>
          <View style={tw`px-4`}>
            {/* <Text> RepaymentScheduleScreen </Text> */}
            <View style={tw`mt-10`}>
              <Text style={tw`mb-4`}>Data Table Component Example</Text>
              <CustomTable {...tableProps}></CustomTable>
            </View>
          </View>
        </ScrollView>
        <View style={tw`px-4 pt-4 border-t border-gray-200`}>
          <CustomButton
            onPress={() => {
              appNavigate('SimulateScreen');
            }}
            color="red">
            Back
          </CustomButton>
        </View>
      </SafeAreaView>
    </View>
  );
};
