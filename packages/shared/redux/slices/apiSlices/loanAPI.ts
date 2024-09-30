import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {
  MetaDataRequestProps,
  PreCheckRequestProps,
  PreCheckResponseProps,
  RequestPendingByUserRequestProps,
  RequestPendingByUserResponseProps,
  RequestPendingRequestProps,
  RequestPendingResponseProps,
} from '@lfvn-customer/shared/types/services/loanTypes';
import {getPath} from './config';
import {ApiTagType} from '@lfvn-customer/shared/types';
export const loanAPI = (
  builder: EndpointBuilder<BaseQueryFn, ApiTagType, 'LFVN-API'>,
) => ({
  preCheck: builder.mutation<PreCheckResponseProps, PreCheckRequestProps>({
    query: (body: PreCheckRequestProps) => ({
      url: getPath('/pre-check'),
      method: 'post',
      data: body,
    }),
  }),
  requestPendingByUser: builder.mutation<
    RequestPendingByUserResponseProps,
    RequestPendingByUserRequestProps
  >({
    query: (body: RequestPendingByUserRequestProps) => ({
      url: getPath('/request-pending/find-by-user'),
      method: 'post',
      data: body,
    }),
  }),
  saveDaftAPL: builder.mutation<
    RequestPendingResponseProps,
    RequestPendingRequestProps
  >({
    query: (body: RequestPendingRequestProps) => ({
      url: getPath('/request-pending'),
      method: 'post',
      data: body,
    }),
  }),
  createAPL: builder.mutation<
    RequestPendingResponseProps,
    MetaDataRequestProps
  >({
    query: (body: MetaDataRequestProps) => ({
      url: getPath('/create-apl'),
      method: 'post',
      data: body,
    }),
  }),
});
