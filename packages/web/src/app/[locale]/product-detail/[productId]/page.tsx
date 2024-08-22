'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

import { Platform, View } from 'react-native';

import tw from 'twrnc';
import { ProductDetailScreen } from '@lfvn-customer/shared/screens/ProductDetail';
import { useParams } from 'next/navigation';
import { detailParamsProp } from '@lfvn-customer/shared/screens/ProductDetail/ProductDetail';

export default function ProductDetail() {
  console.log('Platform.OS', Platform.OS);

  const t = useTranslations();

  const params = useParams<{ productId: string; productName: string }>();

  console.log('paramsWeb', params);

  const pageParams: detailParamsProp = {
    productId: parseInt(params.productId),
    productName: params.productName,
  };

  return (
    <View
      style={tw`flex bg-white min-h-screen flex-col items-center justify-between`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <View style={tw``}>
          <img
            style={tw.style(`absolute`)}
            src="/images/home_bg.png"
            alt="My Image"
          />
          <ProductDetailScreen t={t} params={pageParams} />
        </View>
      </div>
    </View>
  );
}