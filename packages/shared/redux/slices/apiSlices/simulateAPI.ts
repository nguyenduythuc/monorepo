import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {
  MetadataResponseProps,
  ProductResponseProps,
  PurposeResponseProps,
} from '../../../types/services/productTypes';

export const simulateAPI = (
  builder: EndpointBuilder<BaseQueryFn, never, 'LFVN-API'>,
) => ({
  getProduct: builder.query<ProductResponseProps, void>({
    query: () => ({
      url: 'api/loan/product',
      method: 'get',
    }),
  }),
  getPurpose: builder.query<PurposeResponseProps, void>({
    query: () => ({url: 'api/loan/purpose', method: 'get'}),
  }),
  getMetadata: builder.query<MetadataResponseProps, void>({
    query: () => ({
      url: '/public/.well-know/metadata?appVersion=1.0.0',
      method: 'get',
    }),
  }),
});
