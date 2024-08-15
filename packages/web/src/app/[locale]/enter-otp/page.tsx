"use client";
import { AppbarBackAction, EnterOTPScreen } from "@lfvn-customer/shared";
import tw from "@lfvn-customer/shared/themes/tailwind";
import { View } from "react-native";
import { useSearchParams } from "next/navigation";

export default function EnterOTP() {
  const searchParams = useSearchParams();

  const authSeq = searchParams.get("authSeq") ?? "";
  const phoneNumber = searchParams.get("phoneNumber") ?? "";
  const identityNumber = searchParams.get("identityNumber") ?? "";
  const type = searchParams.get("type") ?? "";

  return (
    <View style={tw.style("flex-1 bg-white h-full")}>
      <View style={tw.style("pt-2")}>
        <AppbarBackAction containerStyle="mx-2 mt-4" />
        <EnterOTPScreen
          authSeq={authSeq}
          phoneNumber={phoneNumber}
          identityNumber={identityNumber}
          type={type}
        />
      </View>
    </View>
  );
}
