"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { Platform, ScrollView, View, Text } from "react-native";

import tw from "twrnc";
import useSimulateScreen from "@lfvn-customer/shared/hooks/useSimulateScreen";
import { SimulateScreen } from "@lfvn-customer/shared/screen/SimulateScreen";
import { useConfigRouting } from "@lfvn-customer/shared/hooks/routing";
import {
  Appbar,
  AppbarAction,
  AppbarBackAction,
  AppbarContent,
  CustomButton,
  CustomTable,
  CustomTableProps,
  Icon,
} from "@lfvn-customer/shared/components";

export default function RepaymentSchedule() {
  const headers = ["Id", "Name", "Age", "Job", "Address", "Action"];

  const tableData = [
    {
      id: "1",
      name: "John",
      age: "22",
      job: "DEV",
      address: "Ba Dinh, Hanoi, Vietnam",
      showDetail: {
        type: "action",
        styleWrapper: "flex flex-row",
        props: [
          {
            label: "abc",
            size: "sm",
            color: "green",
            variant: "outlined",
          },
        ],
      },
    },
    {
      id: "1",
      name: "John",
      age: "22",
      job: "DEV",
      address: "Ba Dinh, Hanoi, Vietnam",
      showDetail: {
        type: "action",
        styleWrapper: "flex-row",
        props: [
          {
            label: "abc",
            size: "sm",
            color: "green",
            variant: "outlined",
          },
        ],
      },
    },
    {
      id: "1",
      name: "John",
      age: "22",
      job: "DEV",
      address: "Ba Dinh, Hanoi, Vietnam",
      showDetail: {
        type: "action",
        styleWrapper: "flex-row",
        props: [
          {
            label: "abc",
            size: "sm",
            color: "green",
            variant: "outlined",
          },
        ],
      },
    },
    {
      id: "1",
      name: "John",
      age: "22",
      job: "DEV",
      address: "Ba Dinh, Hanoi, Vietnam",
      showDetail: {
        type: "action",
        styleWrapper: "flex-row",
        props: [
          {
            label: "abc",
            size: "sm",
            color: "green",
            variant: "outlined",
          },
        ],
      },
    },
    {
      id: "1",
      name: "John",
      age: "22",
      job: "DEV",
      address: "Ba Dinh, Hanoi, Vietnam",
      showDetail: {
        type: "action",
        styleWrapper: "flex-row",
        props: [
          {
            label: "abc",
            size: "sm",
            color: "green",
            variant: "outlined",
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
      columnStyles: ["underline font-bold", "font-bold"],
      onRowPress: (rowData) => {
        console.log("RowData123", rowData.rawData);
      },
      //   fixedLeftColumn: true,
      // fixedRightColumn: true,
      // hasAction: true,
    };
  }, [tableData, headers]);

  const { appNavigate } = useConfigRouting();
  const {
    renderFrom: simulateForm,
    handleSubmit: handleSimulate,
    getValues: getValueSimulate,
  } = useSimulateScreen();

  const t = useTranslations();

  return (
    <main className="flex bg-white min-h-screen flex-col items-center justify-between">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <View style={tw``}>
          <>
            <Appbar>
              <AppbarBackAction
                onPress={() => {
                  appNavigate("simulate");
                }}
              />
              {/* <AppbarContent title={''} /> */}
              <AppbarAction title="Back" titleStyle={tw`text-black text-lg`} />
            </Appbar>
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
                  appNavigate("SimulateScreen");
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
