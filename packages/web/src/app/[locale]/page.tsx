"use client";
import { add, LoginScreen } from "@lfvn-customer/shared";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "@lfvn-customer/shared/redux/slices/counterSlice";
import { selectCounterValue } from "@lfvn-customer/shared/redux/selectors/counterSelector";
import { bgLogin } from "@lfvn-customer/shared/assets";
import { useTranslations } from "next-intl";

import { ImageBackground } from "react-native";
import tw from "@lfvn-customer/shared/themes/tailwind";

export default function Home() {
  const dispatch = useDispatch();
  const data = useSelector(selectCounterValue);
  console.log("redux data: ", data);

  const t = useTranslations();

  useEffect(() => {
    console.log(add(1, 2));
    dispatch(increment());
  }, []);
  return (
    <>
      <ImageBackground source={bgLogin} style={tw.style("flex-1")}>
        <LoginScreen t={t} />
      </ImageBackground>
    </>
  );
}
