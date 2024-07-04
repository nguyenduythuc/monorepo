"use client";
import { add } from "@lfvn-customer/shared";
import { Label } from "@lfvn-customer/shared/components/Text";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "@lfvn-customer/shared/redux/slices/counterSlice";
import { selectCounterValue } from "@lfvn-customer/shared/redux/selectors/counterSelector";
import { useTranslations } from "next-intl";
import {
  useGetExampleQuery,
  useSetExampleMutation,
} from "@lfvn-customer/shared/redux/slices/apiSlices";
import { Text, View } from "react-native";
import {
  CheckButton,
  Checkbox,
  Radio,
  RadioButton,
  RadioGroup,
  SwitchCustom,
} from "@lfvn-customer/shared/components";
import tw from "twrnc";

export default function Home() {
  const [selectedValue, setSelectedValue] = React.useState("");

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const listCheck = [
    { label: "Select 1", value: "select1", isChecked: false },
    { label: "Select 2", value: "select2", isChecked: false },
    { label: "Select 3", value: "select3", isChecked: false },
  ];

  const handleSelect = (selectedOption: string) => {
    console.log("Selected option:", selectedOption);
    setSelectedValue(selectedOption);
  };

  const handleSelectCheckBox = (selectedOption: string) => {
    console.log("Selected checkbox:", selectedOption);
  };

  const dispatch = useDispatch();
  const data = useSelector(selectCounterValue);

  const t = useTranslations();

  const { data: apiData, error, isLoading } = useGetExampleQuery();
  const [setExample, { isLoading: isSaving, error: postError }] =
    useSetExampleMutation();
  console.log("redux data: ", data);
  console.log("get API data", apiData, "error: ", error, "loading:", isLoading);
  console.log("set API data error: ", postError, "saving:", isSaving);

  console.log("redux data: ", data);
  useEffect(() => {
    console.log(add(1, 2));
    dispatch(increment());

    (async () => {
      const result = await setExample({ status: "success" });
      console.log("result", result);
    })();
  }, []);
  return (
    <main className="flex bg-white min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <Label text={`${t("welcome")} to home page`} />
        <View style={tw`flex flex-row`}>
          {listCheck.map((option) => (
            <Checkbox
              key={option.value}
              size="xl"
              label={option.label}
              isChecked={option.isChecked}
              onChange={() => handleSelectCheckBox(option.label)}
              color="red"
            ></Checkbox>
          ))}
        </View>
        <View style={tw`flex flex-row`}>
          {listCheck.map((option) => (
            <CheckButton
              prefixIcon="close-circle"
              key={option.value}
              size="xl"
              label={option.label}
              isChecked={option.isChecked}
              onChange={() => handleSelectCheckBox(option.label)}
              color="blue"
            ></CheckButton>
          ))}
        </View>
        <View style={tw`flex-1 justify-center p-5 bg-gray-100`}>
          <Text style={tw`text-xl mb-5`}>Select an option:</Text>
          <View style={tw`flex flex-row`}>
            {options.map((option) => (
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
            listStyle={"col"}
            options={options}
            onSelect={handleSelect}
          />
          <View style={tw`flex flex-row`}>
            {options.map((option) => (
              <RadioButton
                color="green"
                key={option.value}
                label={option.label}
                selected={selectedValue === option.value}
                onPress={() => setSelectedValue(option.value)}
              />
            ))}
          </View>
          <View>
            <SwitchCustom />
          </View>
          <Text style={tw`mt-5 text-lg`}>Selected Value: {selectedValue}</Text>
        </View>
      </div>
    </main>
  );
}
