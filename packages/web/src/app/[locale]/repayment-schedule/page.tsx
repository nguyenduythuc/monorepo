'use client';
import React, { useMemo } from 'react';

import { ScrollView, View, Text } from 'react-native';

import tw from 'twrnc';
import { useConfigRouting } from '@lfvn-customer/shared/hooks/routing';
import {
  Appbar,
  CustomButton,
  CustomTable,
  CustomTableProps,
} from '@lfvn-customer/shared/components';

export default function RepaymentSchedule() {
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
      address: 'Ba Dinh1, Hanoi1, Vietnam1',
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
      address: 'Ba Dinh2, Hanoi2, Vietnam2',
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
      address: 'Ba Dinh3, Hanoi3, Vietnam3',
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
      data: tableData.map((data) => ({
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
      onRowPress: (rowData) => {
        console.log('RowData123', rowData.rawData);
      },
      //   fixedLeftColumn: true,
      // fixedRightColumn: true,
      // hasAction: true,
    };
  }, [tableData, headers]);

  const { goBack } = useConfigRouting();
  return (
    <main className="flex bg-white min-h-screen flex-col items-center justify-between">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <View style={tw``}>
          <>
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
                  goBack();
                }}
                color="red"
              >
                Back
              </CustomButton>
            </View>
          </>
        </View>
      </div>
    </main>
  );
}
