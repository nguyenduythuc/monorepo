"use client";
import { TextInputBase, add } from "@lfvn-customer/shared";
import { Label } from "@lfvn-customer/shared/components/Text";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "@lfvn-customer/shared/redux/slices/counterSlice";
import { selectCounterValue } from "@lfvn-customer/shared/redux/selectors/counterSelector";
import { useTheme } from "@lfvn-customer/shared/themes";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useTranslations } from 'next-intl';

export default function Home() {
  const dispatch = useDispatch();
  const {colorScheme, toggleTheme} = useTheme();
  const data = useSelector(selectCounterValue);
  const t = useTranslations();
  console.log("redux data: ", data);
  useEffect(() => {
    console.log(add(1, 2));
    dispatch(increment());
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <View>
        <Label text={`${t('welcome')} LFVN, Theme: ${colorScheme}`} />
        <Text style={tw`text-xl text-yellow-900`}>Current themes: 2222</Text>
        <TouchableOpacity style={tw`bg-amber-500 h-40`} onPress={toggleTheme}>
          <Text style={tw`text-xl text-red-900`}>Toggle Theme</Text>
        </TouchableOpacity>
      </View>
      <TextInputBase />
    </main>
  );
}
