import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {
  ActiveBiometricRequestProps,
  ActiveBiometricResponseProps,
  BiometricTokenRequestProps,
  BiometricTokenResponseProps,
  CheckBiometricRequestProps,
  CheckBiometricResponseProps,
  DeactiveBiometricRequestProps,
  DeactiveBiometricResponseProps,
} from '@lfvn-customer/shared/types/services/loginBiometricsTypes';

export const loginBiometricsAPI = (
  builder: EndpointBuilder<BaseQueryFn, never, 'LFVN-API'>,
) => ({
  checkBiometric: builder.mutation<
    CheckBiometricResponseProps,
    CheckBiometricRequestProps
  >({
    query: (body: CheckBiometricRequestProps) => ({
      url: '/api/check-biometric',
      method: 'post',
      data: body,
    }),
  }),
  activeBiometric: builder.mutation<
    ActiveBiometricResponseProps,
    ActiveBiometricRequestProps
  >({
    query: (body: ActiveBiometricRequestProps) => ({
      url: '/api/activate-biometric',
      method: 'post',
      data: body,
    }),
  }),
  deactiveBiometric: builder.mutation<
    DeactiveBiometricResponseProps,
    DeactiveBiometricRequestProps
  >({
    query: (body: DeactiveBiometricRequestProps) => ({
      url: '/api/deactivate-biometric',
      method: 'post',
      data: body,
    }),
  }),
  biometricToken: builder.mutation<
    BiometricTokenResponseProps,
    BiometricTokenRequestProps
  >({
    query: (body: BiometricTokenRequestProps) => ({
      url: '/api/biometric-token',
      method: 'post',
      data: body,
    }),
  }),
});
