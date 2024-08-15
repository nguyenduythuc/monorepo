"use client";
import { Appbar, LoginScreen } from "@lfvn-customer/shared";
import tw from "@lfvn-customer/shared/themes/tailwind";
import { View } from "react-native";

export default function Login() {
  return (
    <View>
      <img
        style={tw.style(`absolute`)}
        src="/images/login_bg.png"
        alt="My Image"
      />
      <Appbar backIconColor="white" />
      <LoginScreen />
    </View>
  );
}
