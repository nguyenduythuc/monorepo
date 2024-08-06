import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {MetadataResponseProps} from '@lfvn-customer/shared/types/services/productTypes';

export const publicAPI = (
  builder: EndpointBuilder<BaseQueryFn, never, 'LFVN-API'>,
) => ({
  getMetadata: builder.query<MetadataResponseProps, void>({
    query: () => ({
      url: '/.well-know/metadata?appVersion=1.0.0',
      method: 'get',
    }),
  }),
});
