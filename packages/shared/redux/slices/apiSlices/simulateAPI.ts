import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {
  ProductResponseProps,
  PurposeResponseProps,
} from '@lfvn-customer/shared/types/services/productTypes';
import {getPath} from './config';
import {ApiTagType} from '@lfvn-customer/shared/types';

export const simulateAPI = (
  builder: EndpointBuilder<BaseQueryFn, ApiTagType, 'LFVN-API'>,
) => ({
  getProduct: builder.query<ProductResponseProps, void>({
    query: () => ({
      url: getPath('/loan/product'),
      method: 'get',
    }),
  }),
  getPurpose: builder.query<PurposeResponseProps, void>({
    query: () => ({
      url: getPath('/loan/purpose'),
      method: 'get',
    }),
  }),
});
