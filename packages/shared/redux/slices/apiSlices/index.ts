import {createApi} from '@reduxjs/toolkit/query/react';
import {testAPI} from './testAPI';
import axiosBaseQuery from './config';
import {loginAPI} from './loginAPI';
import Config from 'react-native-config';
import {Platform} from 'react-native';
import {simulateAPI} from './simulateAPI';
import {publicAPI} from './publicAPI';
import {productAPI} from './productAPI';
import {loginBiometricsAPI} from './loginBiometricsAPI';
import {authAPI} from './authAPI';

export const apiSlice = createApi({
  reducerPath: 'LFVN-API',
  baseQuery: axiosBaseQuery({
    baseUrl:
      (Platform.OS !== 'web'
        ? Config.BASE_API_URL
        : '') ?? '',
  }),
  endpoints: builder => ({
    ...testAPI(builder),
    ...loginAPI(builder),
    ...loginBiometricsAPI(builder),
    ...authAPI(builder),
    ...simulateAPI(builder),
    ...productAPI(builder),
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
  useGetProductListQuery,
  useGetMetadataQuery,
  useCheckBiometricMutation,
  useActiveBiometricMutation,
  useDeactiveBiometricMutation,
  useBiometricTokenMutation,
  useGetAccountMutation,
  useRegisterMutation,
  useLazyActiveQuery,
  useGetProductByIdQuery,
} = apiSlice;
