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
import { getPath } from './config';

export const loginAPI = (
  builder: EndpointBuilder<BaseQueryFn, never, 'LFVN-API'>,
) => ({
  login: builder.mutation<LoginResponseProps, LoginRequestProps>({
    query: (body: LoginRequestProps) => ({
      url: getPath('/api/authenticate'),
      method: 'post',
      data: body,
    }),
  }),
  register: builder.mutation<RegisterResponseProps, RegisterRequestProps>({
    query: (body: RegisterRequestProps) => ({
      url: getPath('/api/register'),
      method: 'post',
      data: body,
    }),
  }),
  active: builder.query<RegisterResponseProps, ActiveAccountRequestProps>({
    query: ({key, otp}: ActiveAccountRequestProps) => ({
      url: getPath(`/api/activate?key=${key}&otp=${otp}`),
      method: 'get',
    }),
  }),
  generateOTP: builder.mutation<
    GenerateOTPResponseProps,
    GenerateOTPRequestProps
  >({
    query: (body: GenerateOTPRequestProps) => ({
      url: getPath('/api/otp-logs/generate'),
      method: 'post',
      data: body,
    }),
  }),
  verifyOTP: builder.mutation<VerifyOTPResponseProps, VerifyOTPRequestProps>({
    query: (body: VerifyOTPRequestProps) => ({
      url: getPath('/api/otp-logs/verify'),
      method: 'post',
      data: body,
    }),
  }),
  resendOTP: builder.mutation<ResendOTPResponseProps, ResendOTPRequestProps>({
    query: (body: ResendOTPRequestProps) => ({
      url: getPath('/api/otp-logs/resend'),
      method: 'post',
      data: body,
    }),
  }),
});
