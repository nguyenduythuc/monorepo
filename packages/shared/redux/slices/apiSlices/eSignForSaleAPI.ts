import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {
  SaleimportDocsUploadWebRequestProps,
  VerifySaleContractRequestProps,
  VerifySaleRequestProps,
  CheckNapasRequestProps,
  CheckNapasResponseProps,
  GenerateOTPRequestProps,
  GenerateOTPResponseProps,
  VerifyOTPResponseProps,
  VerifyOTPRequestProps,
  ResendOTPRequestProps,
  ResendOTPResponseProps,
  CheckEKYCRequestProps,
  CheckEKYCResponseProps,
  VerifyEKYCRequestProps,
  SaleSelfCertRequestProps,
  SaleSelfCertResponseProps,
  SignContractRequestProps,
  SignContractResponseProps,
  ResendOTPSignContractRequestProps,
  ResendOTPSignContractResponseProps,
  VerifyEKYCRequestWebProps,
} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';
import {getPath} from './config';
import {ApiTagType} from '@lfvn-customer/shared/types';

export const eSignForSaleAPI = (
  builder: EndpointBuilder<BaseQueryFn, ApiTagType, 'LFVN-API'>,
) => ({
  saleImportDocsUploadWeb: builder.mutation<
    void,
    SaleimportDocsUploadWebRequestProps
  >({
    query: (body: SaleimportDocsUploadWebRequestProps) => {
      const form = new FormData();
      form.append('saleImportId', body.saleImportId);
      form.append('idCardNumber', body.idCardNumber);
      form.append('docIdCard', body.docIdCard.file, body.docIdCard.fileName);
      form.append('docSelfie', body.docSelfie.file, body.docSelfie.fileName);
      form.append('docGtct', body.docGtct.file, body.docGtct.fileName);
      form.append('docVb', body.docVb.file, body.docVb.fileName);
      form.append('docSyll', body.docSyll.file, body.docSyll.fileName);
      form.append('docBank', body.docBank.file, body.docBank.fileName);
      return {
        url: getPath('/sale-import/docs/upload'),
        method: 'post',
        headers: {
          'sale-import-token': body.tokenEsign,
        },
        data: form,
      };
    },
  }),
  verifySale: builder.mutation<void, VerifySaleRequestProps>({
    query: (body: VerifySaleRequestProps) => ({
      url: getPath('/sale-import/verify-sale'),
      method: 'post',
      data: body,
    }),
  }),
  getESignDraft: builder.mutation<Response, VerifySaleContractRequestProps>({
    query: (body: VerifySaleContractRequestProps) => {
      const {token, ...rest} = body;
      return {
        url: getPath('/sale-import/get-contract/draft'),
        method: 'post',
        data: rest,
        headers: {
          'sale-import-token': token,
        },
      };
    },
  }),
  checkNapasAccount: builder.mutation<
    CheckNapasResponseProps,
    CheckNapasRequestProps
  >({
    query: (body: CheckNapasRequestProps) => ({
      url: getPath('/sale-import/check-napas'),
      method: 'post',
      data: body,
      headers: {
        'sale-import-token': body.tokenEsign,
      },
    }),
  }),
  otpGenerateBase: builder.mutation<
    GenerateOTPResponseProps,
    GenerateOTPRequestProps
  >({
    query: (body: GenerateOTPRequestProps) => ({
      url: getPath('/otp/generate'),
      method: 'post',
      data: body,
    }),
  }),
  otpVerifyBase: builder.mutation<
    VerifyOTPResponseProps,
    VerifyOTPRequestProps
  >({
    query: (body: VerifyOTPRequestProps) => ({
      url: getPath('/otp/verify'),
      method: 'post',
      data: body,
    }),
  }),
  otpResendBase: builder.mutation<
    ResendOTPResponseProps,
    ResendOTPRequestProps
  >({
    query: (body: ResendOTPRequestProps) => ({
      url: getPath('/otp/resend'),
      method: 'post',
      data: body,
    }),
  }),
  checkEKYC: builder.mutation<CheckEKYCResponseProps, CheckEKYCRequestProps>({
    query: (body: CheckEKYCRequestProps) => ({
      url: getPath('/sale-import/check-ekyc'),
      method: 'post',
      data: body,
    }),
  }),
  verifyEKYC: builder.mutation<void, VerifyEKYCRequestProps>({
    query: (body: VerifyEKYCRequestProps) => {
      const form = new FormData();
      form.append('id', body.id);
      form.append('idCardNumber', body.idCardNumber);
      form.append('idCardIssuedAt', body.idCardIssuedAt);
      form.append('idCardIssuedBy', body.idCardIssuedBy);
      form.append(
        'selfiePhoto',
        JSON.parse(
          JSON.stringify({
            uri: body.selfiePhoto.uri,
            name: body.selfiePhoto.name,
            type: body.selfiePhoto.type,
          }),
        ),
      );
      return {
        url: getPath('/sale-import/verify-ekyc'),
        method: 'post',
        headers: {
          'sale-import-token': body.tokenEsign,
        },
        data: form,
      };
    },
  }),
  verifyEKYCWeb: builder.mutation<void, VerifyEKYCRequestWebProps>({
    query: (body: VerifyEKYCRequestWebProps) => {
      const form = new FormData();
      form.append('id', body.id);
      form.append('idCardNumber', body.idCardNumber);
      form.append('idCardIssuedAt', body.idCardIssuedAt);
      form.append('idCardIssuedBy', body.idCardIssuedBy);
      form.append('selfiePhoto', body.selfiePhoto, body.fileName);
      return {
        url: getPath('/sale-import/verify-ekyc'),
        method: 'post',
        headers: {
          'sale-import-token': body.tokenEsign,
        },
        data: form,
      };
    },
  }),
  saleSelfCert: builder.mutation<
    SaleSelfCertResponseProps,
    SaleSelfCertRequestProps
  >({
    query: (body: SaleSelfCertRequestProps) => ({
      url: getPath('/sale-import/esign/sale-cert'),
      method: 'post',
      data: body,
    }),
  }),
  signContract: builder.mutation<
    SignContractResponseProps,
    SignContractRequestProps
  >({
    query: (body: SignContractRequestProps) => ({
      url: getPath('/sale-import/esign/sign-contract'),
      method: 'post',
      data: body,
    }),
  }),
  resendOTPSignContract: builder.mutation<
    ResendOTPSignContractResponseProps,
    ResendOTPSignContractRequestProps
  >({
    query: (body: ResendOTPSignContractRequestProps) => ({
      url: getPath('/sale-import/esign/resend-otp'),
      method: 'post',
      data: body,
    }),
  }),
});
