import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';

import {getPath} from './config';
import {ApiTagType} from '@lfvn-customer/shared/types';
import {
  GetLocalListRequestProps,
  BankListResponseProps,
  OccupationListResponseProps,
  BankListNapasType,
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
  getBankListNapasData: builder.query<BankListNapasType[], void>({
    query: () => ({
      url: getPath('/banks/get-all'),
      method: 'get',
    }),
  }),

  getOneBankNapasData: builder.query<BankListNapasType, {bankId: number}>({
    query: bankId => ({
      url: getPath(`/banks/${bankId}`),
      method: 'get',
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
