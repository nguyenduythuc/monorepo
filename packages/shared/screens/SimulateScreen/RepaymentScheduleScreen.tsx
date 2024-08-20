import {
  Appbar,
  CustomButton,
  CustomTable,
  CustomTableProps,
} from '@lfvn-customer/shared/components';
import React, {useMemo} from 'react';
import {View, Text, ScrollView} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';

export const RepaymentScheduleScreen = ({t}: {t: any}) => {
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

  return (
    <>
      <Appbar labelContent={t('Simulate.repaymentSchedule')} />
      <ScrollView style={tw`flex-1`}>
        <View style={tw`mx-4 flex-1`}>
          <View style={tw`mt-2`}>
            <Text style={tw`mb-4`}>Data Table Component Example</Text>
            <CustomTable {...tableProps}></CustomTable>
          </View>
        </View>
      </ScrollView>
      <View style={tw`bg-white px-4 pt-3 pb-1 border-t border-gray-200`}>
        <CustomButton onPress={() => {}}>
          {t('Simulate.exportTable')}
        </CustomButton>
      </View>
    </>
  );
};
