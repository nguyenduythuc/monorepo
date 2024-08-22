'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

import { Platform, View } from 'react-native';

import tw from 'twrnc';
import { ProductDetailScreen } from '@lfvn-customer/shared/screens/ProductDetail';
import { useParams, useSearchParams } from 'next/navigation';
import { detailParamsProp } from '@lfvn-customer/shared/screens/ProductDetail/ProductDetail';

export default function ProductDetail() {
  console.log('Platform.OS', Platform.OS);

  const t = useTranslations();

  const searchParams = useSearchParams();

  const productId = searchParams.get('productId');
  const productName = searchParams.get('productName');

  console.log('paramsWeb123', productId, productName);

  const pageParams: detailParamsProp = {
    productId: parseInt(productId || ''),
    productName: productName || '',
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
