"use client";
import {
  Appbar,
  AppbarBackAction,
  VerifyAccountScreen,
} from "@lfvn-customer/shared";
import tw from "@lfvn-customer/shared/themes/tailwind";
import { useSearchParams } from "next/navigation";
import { View } from "react-native";

export default function VerifyAccount() {
  const searchParams = useSearchParams();

  const type = searchParams.get("type") ?? "";
  return (
    <View style={tw.style("flex-1 bg-white h-full")}>
      <Appbar />
      <View style={tw.style("pt-2")}>
        <VerifyAccountScreen type={type} />
      </View>
    </View>
  );
}
