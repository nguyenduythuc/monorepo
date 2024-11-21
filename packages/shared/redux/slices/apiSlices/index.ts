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
import {loanAPI} from './loanAPI';
import {ggMapAPI} from './ggMapApi';
import {localAddressAPI} from './localAddress';
import {fileAPI} from './fileAPI';
import {cifAPI} from './cifAPI';
import {eSignForSaleAPI} from './eSignForSaleAPI';

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
    ...loanAPI(builder),
    ...localAddressAPI(builder),
    ...fileAPI(builder),
    ...cifAPI(builder),
    ...eSignForSaleAPI(builder),
  }),
});

export const ggMapApiSlice = createApi({
  reducerPath: 'LFVN-API',
  baseQuery: axiosBaseQuery({
    baseUrl: Config.G_MAP_API_URL || '',
  }),
  endpoints: builder => ({
    ...ggMapAPI(builder),
  }),
});

export const {
  useLoginMutation,
  useGenerateOTPMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
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
  usePreCheckMutation,
  useRequestPendingByUserMutation,
  useSaveDaftAPLMutation,
  useGetCountryListMutation,
  useGetDistrictListMutation,
  useGetProvinceListMutation,
  useGetWardListMutation,
  useGetProductSchemeListQuery,
  useGetProductSchemeByIdQuery,
  useCreateAPLMutation,
  useLazyGetCifInfoQuery,
  useCheckTRAndProductMutation,
  useSubmitSuggestTRMutation,
  useCreateFolderEcmMutation,
  useUploadDocumentEcmMutation,
  useUploadDocumentEcmWebMutation,
  useSubmitRbpInfoMutation,
  useUploadUserResourceMutation,
  useUploadUserResourceWebMutation,
  useLazyGetUserResourceQuery,
  useLazyGetFileQuery,
  useChangePasswordRequestMutation,
  useVerifyChangePasswordMutation,
  useGetCifDataMutation,
  useGetAplDataMutation,
  useGetBankListDataMutation,
  useGetOccupationListDataMutation,
  useLoanOfferMutation,
  useSaleImportDocsUploadWebMutation,
  useVerifySaleMutation,
} = apiSlice;

export const {useLazyGetPlaceAutoCompleteQuery} = ggMapApiSlice;
