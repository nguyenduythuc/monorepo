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
} from '@lfvn-customer/shared/types/services';

export const loginAPI = (
  builder: EndpointBuilder<BaseQueryFn, never, 'LFVN-API'>,
) => ({
  login: builder.mutation<LoginResponseProps, LoginRequestProps>({
    query: (body: LoginRequestProps) => ({
      url: '/authenticate',
      method: 'post',
      data: body,
    }),
  }),
  generateOTP: builder.mutation<
    GenerateOTPResponseProps,
    GenerateOTPRequestProps
  >({
    query: (body: GenerateOTPRequestProps) => ({
      url: '/otp-logs/generate',
      method: 'post',
      data: body,
    }),
  }),
  verifyOTP: builder.mutation<VerifyOTPResponseProps, VerifyOTPRequestProps>({
    query: (body: VerifyOTPRequestProps) => ({
      url: '/otp-logs/verify',
      method: 'post',
      data: body,
    }),
  }),
  resendOTP: builder.mutation<ResendOTPResponseProps, ResendOTPRequestProps>({
    query: (body: ResendOTPRequestProps) => ({
      url: '/otp-logs/resend',
      method: 'post',
      data: body,
    }),
  }),
});
