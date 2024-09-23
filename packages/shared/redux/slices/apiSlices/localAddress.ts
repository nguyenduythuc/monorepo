import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

import { getPath } from './config';
import { ApiTagType } from '@lfvn-customer/shared/types';
import { GetLocalListRequestProps, AddressLocalListResponseProps } from '@lfvn-customer/shared/types/services/localAddressType';

export const localAddressAPI = (
    builder: EndpointBuilder<BaseQueryFn, ApiTagType, 'LFVN-API'>,
) => ({
    getCountryList: builder.mutation<AddressLocalListResponseProps, GetLocalListRequestProps>({
        query: (body: GetLocalListRequestProps) => ({
            url: getPath('/category/country'),
            method: 'post',
            data: body,
        }),
    }),
    getProvinceList: builder.mutation<AddressLocalListResponseProps, GetLocalListRequestProps>({
        query: (body: GetLocalListRequestProps) => ({
            url: getPath('/category/province'),
            method: 'post',
            data: body,
        }),
    }),
    getDistrictList: builder.mutation<AddressLocalListResponseProps, GetLocalListRequestProps>({
        query: (body: GetLocalListRequestProps) => ({
            url: getPath('/category/district'),
            method: 'post',
            data: body,
        }),
    }),
    getWardList: builder.mutation<AddressLocalListResponseProps, GetLocalListRequestProps>({
        query: (body: GetLocalListRequestProps) => ({
            url: getPath('/category/ward'),
            method: 'post',
            data: body,
        }),
    }),
});
