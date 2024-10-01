import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {
  CheckTRandProductRequestProps,
  CheckTRandProductResponseProps,
  CreateAPLResponseProps,
  FindCifInfoRequestProps,
  FindCifInfoResponseProps,
  MetaDataRequestProps,
  PreCheckRequestProps,
  PreCheckResponseProps,
  RequestPendingByUserRequestProps,
  RequestPendingByUserResponseProps,
  RequestPendingRequestProps,
  RequestPendingResponseProps,
  SubmmitSuggestTRRequestProps,
  SubmmitSuggestTRResponseProps,
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
  createAPL: builder.mutation<CreateAPLResponseProps, MetaDataRequestProps>({
    query: (body: MetaDataRequestProps) => ({
      url: getPath('/create-apl'),
      method: 'post',
      data: body,
    }),
  }),
  getCifInfo: builder.query<FindCifInfoResponseProps, FindCifInfoRequestProps>({
    query: (query: FindCifInfoRequestProps) => ({
      url: getPath(`/find-cif-apl?flowId=${query.flowId}`),
      method: 'get',
    }),
  }),
  checkTRAndProduct: builder.mutation<
    CheckTRandProductResponseProps,
    CheckTRandProductRequestProps
  >({
    query: (body: CheckTRandProductRequestProps) => ({
      url: getPath('/topup-refinance/check-by-cifid'),
      method: 'post',
      data: body,
    }),
  }),
  submitSuggestTR: builder.mutation<
    SubmmitSuggestTRResponseProps,
    SubmmitSuggestTRRequestProps
  >({
    query: (body: SubmmitSuggestTRRequestProps) => ({
      url: getPath('/submit-topup-suggest-tr'),
      method: 'post',
      data: body,
    }),
  }),
});
