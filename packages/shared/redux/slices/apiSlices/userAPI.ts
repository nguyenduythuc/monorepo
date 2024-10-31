import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {
  ChangePasswordRequestProps,
  ChangePasswordResponseProps,
  UpdateAccountRequestProps,
  UpdateAccountResponseProps,
  VerifyChangePasswordRequestProps,
} from '@lfvn-customer/shared/types/services/authTypes';
import {getPath} from './config';
import {ApiTagType} from '@lfvn-customer/shared/types';

export const userAPI = (
  builder: EndpointBuilder<BaseQueryFn, ApiTagType, 'LFVN-API'>,
) => ({
  updateAccount: builder.mutation<
    UpdateAccountResponseProps,
    UpdateAccountRequestProps
  >({
    query: (body: UpdateAccountRequestProps) => ({
      url: getPath('/account'),
      method: 'post',
      data: body,
    }),
  }),
  changePasswordRequest: builder.mutation<
    ChangePasswordResponseProps,
    ChangePasswordRequestProps
  >({
    query: (body: ChangePasswordRequestProps) => ({
      url: getPath('/account/change-password-request'),
      method: 'post',
      data: body,
    }),
  }),
  verifyChangePassword: builder.mutation<
    void,
    VerifyChangePasswordRequestProps
  >({
    query: (body: VerifyChangePasswordRequestProps) => ({
      url: getPath('/account/change-password'),
      method: 'post',
      data: body,
    }),
  }),
});
