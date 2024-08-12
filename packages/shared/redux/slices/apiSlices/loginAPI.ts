import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {
  LoginRequestProps,
  LoginResponseProps,
  GenerateOTPRequestProps,
  GenerateOTPResponseProps,
  VerifyOTPRequestProps,
  VerifyOTPResponseProps,
  ResendOTPResponseProps,
  ResendOTPRequestProps,
  RegisterResponseProps,
  RegisterRequestProps,
  ActiveAccountRequestProps,
} from '@lfvn-customer/shared/types/services';

export const loginAPI = (
  builder: EndpointBuilder<BaseQueryFn, never, 'LFVN-API'>,
) => ({
  login: builder.mutation<LoginResponseProps, LoginRequestProps>({
    query: (body: LoginRequestProps) => ({
      url: '/api/authenticate',
      method: 'post',
      data: body,
    }),
  }),
  register: builder.mutation<RegisterResponseProps, RegisterRequestProps>({
    query: (body: RegisterRequestProps) => ({
      url: '/api/register',
      method: 'post',
      data: body,
    }),
  }),
  active: builder.query<RegisterResponseProps, ActiveAccountRequestProps>({
    query: ({key, otp}: ActiveAccountRequestProps) => ({
      url: `/activate?key=${key}&otp=${otp}`,
      method: 'get',
    }),
  }),
  generateOTP: builder.mutation<
    GenerateOTPResponseProps,
    GenerateOTPRequestProps
  >({
    query: (body: GenerateOTPRequestProps) => ({
      url: '/api/otp-logs/generate',
      method: 'post',
      data: body,
    }),
  }),
  verifyOTP: builder.mutation<VerifyOTPResponseProps, VerifyOTPRequestProps>({
    query: (body: VerifyOTPRequestProps) => ({
      url: '/api/otp-logs/verify',
      method: 'post',
      data: body,
    }),
  }),
  resendOTP: builder.mutation<ResendOTPResponseProps, ResendOTPRequestProps>({
    query: (body: ResendOTPRequestProps) => ({
      url: '/api/otp-logs/resend',
      method: 'post',
      data: body,
    }),
  }),
});
