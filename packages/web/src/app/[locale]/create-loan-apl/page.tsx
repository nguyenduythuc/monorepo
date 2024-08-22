"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { Platform, View } from "react-native";

import tw from "twrnc";
import { ProductDetailScreen } from "@lfvn-customer/shared/screens/ProductDetail";
import { detailParamsProp } from "@lfvn-customer/shared/screens/ProductDetail/ProductDetail";
import { CreateLoanAPLScreen } from "@lfvn-customer/shared/screens";

export default function CreateLoanApl() {
  console.log("Platform.OS", Platform.OS);

  const t = useTranslations();

  return (
    <View
      style={tw`flex bg-white min-h-screen flex-col items-center justify-between`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <View style={tw``}>
            <img
                style={tw.style(`absolute`)}
                src="/images/create_loan_apl_bg.png"
                alt="My Image"
            />
          <CreateLoanAPLScreen t={t} />
        </View>
      </div>
    </View>
  );
}
