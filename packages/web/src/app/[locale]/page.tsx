"use client";
import {
  add,
  TextInputSearch,
  TextInput,
} from "@lfvn-customer/shared";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTheme } from "@lfvn-customer/shared/hooks/useGetTheme";
import { increment } from "@lfvn-customer/shared/redux/slices/counterSlice";
import { selectCounterValue } from "@lfvn-customer/shared/redux/selectors/counterSelector";

import { View, Text, TouchableOpacity } from "react-native";
import { useTranslations } from "next-intl";
import tw from "@lfvn-customer/shared/themes/tailwind";

export default function Home() {
  const dispatch = useDispatch();
  const { colorScheme, toggleTheme, theme } = useGetTheme();
  const data = useSelector(selectCounterValue);
  const t = useTranslations();
  console.log("redux data: ", data);

  const [text, setText] = useState("");

  const onPressClearText = () => {
    setText("");
  };

  useEffect(() => {
    console.log(add(1, 2));
    dispatch(increment());
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <View style={tw`flex-1 ${theme.background}`}>
        <Text style={tw`text-xl ${theme.primary}`}>{`${t(
          'welcome',
        )}, Theme: ${colorScheme}`}</Text>
        <TouchableOpacity style={tw`${theme.buttonPrimary} h-40`} onPress={toggleTheme}>
          <Text style={tw`text-xl ${theme.text}`}>Toggle Theme</Text>
        </TouchableOpacity>
        <TextInput
          label="Label Name"
          placeholder="Type Something"
          containerStyle="mt-4"
          required
          value={text}
          onChangeText={setText}
          // error="Error Text is displayed here, up to 2 lines"
          onPressRightComponent={onPressClearText}
          // disabled
          focus
        />
        <TextInputSearch
          label="Label Name"
          placeholder="Type Something"
          containerStyle="mt-4"
          required
          value={text}
          onChangeText={setText}
          // error="Error Text is displayed here, up to 2 lines"
          onPressRightComponent={onPressClearText}
          // disabled
          focus
        />
      </View>
    </main>
  );
}
