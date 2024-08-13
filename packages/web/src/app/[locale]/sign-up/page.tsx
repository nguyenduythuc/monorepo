"use client";
import { AppbarBackAction, SignUpScreen } from "@lfvn-customer/shared";
import tw from "@lfvn-customer/shared/themes/tailwind";
import { View } from "react-native";

export default function SignUp() {
  return (
    <View style={tw.style("flex-1 bg-white h-full")}>
      <View style={tw.style("pt-2")}>
        <AppbarBackAction containerStyle="mx-2 mt-4" />
        <SignUpScreen />
      </View>
    </View>
  );
}
