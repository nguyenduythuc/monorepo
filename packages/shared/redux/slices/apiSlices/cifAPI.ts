import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';

import {getPath} from './config';
import {ApiTagType} from '@lfvn-customer/shared/types';
import {
  GetLocalListRequestProps,
  AddressLocalListResponseProps,
  BankListResponseProps,
  OccupationListResponseProps,
} from '@lfvn-customer/shared/types/services/localAddressType';

export const cifAPI = (
  builder: EndpointBuilder<BaseQueryFn, ApiTagType, 'LFVN-API'>,
) => ({
  getBankListData: builder.mutation<
    BankListResponseProps,
    GetLocalListRequestProps
  >({
    query: (body: GetLocalListRequestProps) => ({
      url: getPath('/category/banks'),
      method: 'post',
      data: body,
    }),
  }),
  getOccupationListData: builder.mutation<
    OccupationListResponseProps,
    GetLocalListRequestProps
  >({
    query: (body: GetLocalListRequestProps) => ({
      url: getPath('/category/occupations'),
      method: 'post',
      data: body,
    }),
  }),
});
