import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {
  ProductGroupProps,
  ProductDetailResponseProps,
  ProductScheme,
} from '@lfvn-customer/shared/types/services/productTypes';
import {getPath} from './config';
import {ApiTagType} from '@lfvn-customer/shared/types';

export const productAPI = (
  builder: EndpointBuilder<BaseQueryFn, ApiTagType, 'LFVN-API'>,
) => ({
  getProductList: builder.query<ProductGroupProps, void>({
    query: () => ({
      url: getPath('/product-groups'),
      method: 'get',
    }),
    providesTags: ['Product'],
  }),
  getProductById: builder.query<
    ProductDetailResponseProps,
    {productId: number}
  >({
    query: ({productId}) => ({
      url: getPath(`/product-groups/${productId}`),
      method: 'get',
    }),
  }),
  getProductSchemeList: builder.query<ProductScheme[], void>({
    query: () => ({
      url: getPath('/product-schemes'),
      method: 'get',
    }),
    providesTags: ['Product'],
  }),
  getProductSchemeById: builder.query<ProductScheme, {productId: number}>({
    query: ({productId}) => ({
      url: getPath(`/product-schemes/${productId}`),
      method: 'get',
    }),
  }),
});
