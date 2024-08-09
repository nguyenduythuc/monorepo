import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {
  ProductResponseProps,
  PurposeResponseProps,
} from '@lfvn-customer/shared/types/services/productTypes';

export const simulateAPI = (
  builder: EndpointBuilder<BaseQueryFn, never, 'LFVN-API'>,
) => ({
  getProduct: builder.query<ProductResponseProps, void>({
    query: () => ({
      url: '/api/loan/product',
      method: 'get',
    }),
  }),
  getPurpose: builder.query<PurposeResponseProps, void>({
    query: () => ({
      url: '/api/loan/purpose',
      method: 'get',
    }),
  }),
});
