import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {
  MetadataResponseProps,
  ProductGroupProps,
  ProductResponseProps,
  PurposeResponseProps,
} from '@lfvn-customer/shared/types/services/productTypes';
import { getPath } from './config';

export const productAPI = (
  builder: EndpointBuilder<BaseQueryFn, never, 'LFVN-API'>,
) => ({
  getProductList: builder.query<ProductGroupProps, void>({
    query: () => ({
      url: getPath('/api/product-group'),
      method: 'get',
    }),
  }),
  //   getProductById: builder.query<ProductResponseProps, void>({
  //     query: () => ({
  //       url: `/loan/product/${productId}`,
  //       method: 'get',
  //     }),
  //   }),
});
