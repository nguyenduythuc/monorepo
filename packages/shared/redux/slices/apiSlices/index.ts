import {createApi} from '@reduxjs/toolkit/query/react';
import {testAPI} from './testAPI';
import axiosBaseQuery from './config';
import {loginAPI} from './loginAPI';
import Config from 'react-native-config';
import {Platform} from 'react-native';

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
  }),
});

export const {useGetExampleQuery, useSetExampleMutation, useLoginMutation} =
  apiSlice;
