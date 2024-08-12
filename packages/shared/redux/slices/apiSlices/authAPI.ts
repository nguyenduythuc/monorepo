import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {GetAccountResponseProps} from '@lfvn-customer/shared/types/services/authTypes';
export const authAPI = (
  builder: EndpointBuilder<BaseQueryFn, never, 'LFVN-API'>,
) => ({
  getAccount: builder.mutation<GetAccountResponseProps, void>({
    query: () => ({
      url: '/api/account',
      method: 'get',
    }),
  }),
});
