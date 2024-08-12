"use client";
import { EnterOTPScreen } from "@lfvn-customer/shared";
import { useTranslations } from "next-intl";
import tw from "@lfvn-customer/shared/themes/tailwind";

export default function EnterOTP() {
  const t = useTranslations();

  return (
    <div style={tw.style("flex-1 bg-white h-full pt-20")}>
      <EnterOTPScreen
        authSeq={"authSeq"}
        phoneNumber={"phoneNumber"}
        identityNumber={"identityNumber"}
        t={t}
      />
    </div>
  );
}
