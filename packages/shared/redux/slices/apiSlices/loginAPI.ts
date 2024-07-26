import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {LoginRequestProps, LoginResponseProps} from '../../../types/services';

export const loginAPI = (
  builder: EndpointBuilder<BaseQueryFn, never, 'LFVN-API'>,
) => ({
  login: builder.mutation<LoginResponseProps, LoginRequestProps>({
    query: (body: LoginRequestProps) => ({
      url: '/authenticate',
      method: 'post',
      data: body,
    }),
  }),
});
