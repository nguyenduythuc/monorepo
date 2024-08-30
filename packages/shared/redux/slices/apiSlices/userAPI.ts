import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {
  UpdateAccountRequestProps,
  UpdateAccountResponseProps,
  UpdateOCRIdentityNumberRequestProps,
  UpdateOCRIdentityNumberResponseProps,
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
  updateOCRIdentityNumber: builder.mutation<
    UpdateOCRIdentityNumberResponseProps,
    UpdateOCRIdentityNumberRequestProps
  >({
    query: (body: UpdateOCRIdentityNumberRequestProps) => ({
      url: getPath('/account/update-ocr-identity-number'),
      method: 'post',
      data: body,
    }),
  }),
});
