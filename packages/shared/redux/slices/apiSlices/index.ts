import {createApi} from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './config';
import {loginAPI} from './loginAPI';
import Config from 'react-native-config';
import {Platform} from 'react-native';
import {simulateAPI} from './simulateAPI';
import {publicAPI} from './publicAPI';
import {productAPI} from './productAPI';
import {loginBiometricsAPI} from './loginBiometricsAPI';
import {authAPI} from './authAPI';
import {verifyAccountAPI} from './verifyAccountAPI';
import {userAPI} from './userAPI';

export const apiSlice = createApi({
  reducerPath: 'LFVN-API',
  baseQuery: axiosBaseQuery({
    baseUrl: (Platform.OS !== 'web' ? Config.BASE_API_URL : '') ?? '',
  }),
  tagTypes: ['Product'],
  endpoints: builder => ({
    ...loginAPI(builder),
    ...loginBiometricsAPI(builder),
    ...authAPI(builder),
    ...simulateAPI(builder),
    ...productAPI(builder),
    ...publicAPI(builder),
    ...verifyAccountAPI(builder),
    ...userAPI(builder),
  }),
});

export const {
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
  useResetPasswordInitMutation,
  useResetPasswordFinishMutation,
  useVerifyAccountMutation,
  useUpdateAccountMutation,
  useUpdateOCRIdentityNumberMutation,
} = apiSlice;
