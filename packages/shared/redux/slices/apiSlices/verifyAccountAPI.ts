import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {
  VerifyAccountResponse,
  VerifyAccountRequest,
} from '@lfvn-customer/shared/types/services/verifyAccount';
import {getPath} from './config';
import {ApiTagType} from '@lfvn-customer/shared/types';

export const verifyAccountAPI = (
  builder: EndpointBuilder<BaseQueryFn, ApiTagType, 'LFVN-API'>,
) => ({
  verifyAccount: builder.mutation<VerifyAccountResponse, VerifyAccountRequest>({
    query: (body: VerifyAccountRequest) => ({
      url: getPath('/account/verify-account'),
      method: 'post',
      data: body,
    }),
  }),
});
