"use client";
import { LoginScreen } from "@lfvn-customer/shared";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import tw from "@lfvn-customer/shared/themes/tailwind";

export default function Login() {
  const t = useTranslations();

  return (
    <div>
      <img
        style={tw.style(`absolute`)}
        src="/images/login_bg.png"
        alt="My Image"
      />
      <LoginScreen t={t} />
    </div>
  );
}
