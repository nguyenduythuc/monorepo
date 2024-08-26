import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {MetadataResponseProps} from '@lfvn-customer/shared/types/services/productTypes';
import {ApiType, getPath} from './config';
import {ApiTagType} from '@lfvn-customer/shared/types';

export const publicAPI = (
  builder: EndpointBuilder<BaseQueryFn, ApiTagType, 'LFVN-API'>,
) => ({
  getMetadata: builder.query<MetadataResponseProps, void>({
    query: () => ({
      url: getPath('/.well-know/metadata?appVersion=1.0.0', ApiType.Public),
      method: 'get',
    }),
  }),
});
