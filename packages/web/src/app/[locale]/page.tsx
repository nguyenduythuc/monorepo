"use client";
import { add } from "@lfvn-customer/shared";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTheme } from "@lfvn-customer/shared/hooks/useGetTheme";
import { increment } from "@lfvn-customer/shared/redux/slices/counterSlice";
import { selectCounterValue } from "@lfvn-customer/shared/redux/selectors/counterSelector";
import { bgLogin, logoAppTransparent } from "@lfvn-customer/shared/assets";

import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";
import { useTranslations } from "next-intl";
import tw from "@lfvn-customer/shared/themes/tailwind";
import useLoginScreen from "@lfvn-customer/shared/hooks/useLogin";
import { Icon } from "@lfvn-customer/shared/components";

export default function Home() {
  const dispatch = useDispatch();
  const { colorScheme, toggleTheme, theme } = useGetTheme();
  const data = useSelector(selectCounterValue);
  const t = useTranslations();
  console.log("redux data: ", data);

  const { renderFrom, onPressSubmit } = useLoginScreen();

  const { textNegative500, textUseful500, textNegative300 } = theme;

  useEffect(() => {
    console.log(add(1, 2));
    dispatch(increment());
  }, []);
  return (
    <ImageBackground source={bgLogin} style={tw.style("flex-1")}>
      <Image alt="" source={logoAppTransparent} style={styles.imgLogo} />
      <Text style={tw.style("text-white mt-24 text-2xl font-semibold px-4")}>
        {t("Login.title")}
      </Text>
      <Text style={tw.style("text-white mt-1 text-32px font-semibold px-4")}>
        {t("Login.desc")}
      </Text>
      <View style={tw.style("flex-1 bg-white p-6 mt-4 rounded-t-20px")}>
        <View style={tw.style("flex-1")}>
          <Text style={tw.style(`text-32px font-semibold ${textNegative500}`)}>
            {t("Login.login")}
          </Text>
          <Text style={tw.style(`text-lg mt-3 ${textNegative500}`)}>
            {t("Login.descLogin")}
          </Text>
          {renderFrom()}
          <View style={tw.style("flex-row justify-between mb-4")}>
            <TouchableOpacity>
              <Text
                style={tw.style(`text-base font-semibold ${textUseful500}`)}
              >
                {t("Login.dontHaveAcc")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={tw.style(`text-base font-semibold ${textUseful500}`)}
              >
                {t("Login.forgotPassword")}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={onPressSubmit}
            style={tw.style("p-4 items-center bg-red-500 rounded-10px")}
          >
            <Text style={tw.style("text-lg font-semibold text-white")}>
              {t("Login.login")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw.style("flex-row justify-center mt-6")}>
            <Text style={tw.style(`text-base font-semibold ${textUseful500}`)}>
              {t("Login.otpLogin")}
            </Text>
            <Icon name="arrow-right" size={24} />
          </TouchableOpacity>
        </View>
        <View style={tw.style("flex-row justify-center mt-8")}>
          <TouchableOpacity>
            <Text
              style={tw.style(
                `text-base text-decoration-line: underline ${textNegative300}`
              )}
            >
              {t("Login.conditional")}
            </Text>
          </TouchableOpacity>
          <Text style={tw.style(`text-base ${textNegative300}`)}>
            {` ${t("Login.and")} `}
          </Text>
          <TouchableOpacity>
            <Text
              style={tw.style(
                `text-base text-decoration-line: underline ${textNegative300}`
              )}
            >
              {t("Login.policy")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  imgLogo: {
    width: 115,
    height: 41,
    marginTop: 16,
    marginHorizontal: 16,
  },
});
