import {createApi} from '@reduxjs/toolkit/query/react';
import {testAPI} from './testAPI';
import axiosBaseQuery from './config';
import {loginAPI} from './loginAPI';
import Config from 'react-native-config';
import {Platform} from 'react-native';
import {simulateAPI} from './simulateAPI';
import {publicAPI} from './publicAPI';

export const apiSlice = createApi({
  reducerPath: 'LFVN-API',
  baseQuery: axiosBaseQuery({
    baseUrl:
      (Platform.OS !== 'web'
        ? Config.BASE_API_URL
        : process.env.BASE_API_URL) ?? '',
  }),
  endpoints: builder => ({
    ...testAPI(builder),
    ...loginAPI(builder),
    ...simulateAPI(builder),
  }),
});

export const pulicApiSlice = createApi({
  reducerPath: 'LFVN-API',
  baseQuery: axiosBaseQuery({
    baseUrl:
      (Platform.OS !== 'web'
        ? Config.BASE_API_URL_PUBLIC
        : process.env.BASE_API_URL_PUBLIC) ?? '',
  }),
  endpoints: builder => ({
    ...publicAPI(builder),
  }),
});

export const {
  useGetExampleQuery,
  useSetExampleMutation,
  useLoginMutation,
  useGenerateOTPMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useGetProductQuery,
  useGetPurposeQuery,
} = apiSlice;
export const {useGetMetadataQuery} = pulicApiSlice;
