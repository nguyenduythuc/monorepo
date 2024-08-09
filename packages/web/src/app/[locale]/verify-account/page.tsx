"use client";
import { VerifyAccountScreen } from "@lfvn-customer/shared";
import { useTranslations } from "next-intl";
import tw from "@lfvn-customer/shared/themes/tailwind";

export default function VerifyAccount() {
  const t = useTranslations();

  return (
    <div style={tw.style("flex-1 bg-white h-full pt-20")}>
      <VerifyAccountScreen t={t} />
    </div>
  );
}
