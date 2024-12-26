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
  UpdateEKYCRequestProps,
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
      if (body?.docIdCard?.file) {
        form.append('docIdCard', body.docIdCard.file, body.docIdCard.fileName);
      }
      if (body?.docSelfie?.file) {
        form.append('docSelfie', body.docSelfie.file, body.docSelfie.fileName);
      }
      if (body?.docGtct?.file) {
        form.append('docGtct', body.docGtct.file, body.docGtct.fileName);
      }
      if (body?.docVb?.file) {
        form.append('docVb', body.docVb.file, body.docVb.fileName);
      }
      if (body?.docSyll?.file) {
        form.append('docSyll', body.docSyll.file, body.docSyll.fileName);
      }
      if (body?.docBank?.file) {
        form.append('docBank', body.docBank.file, body.docBank.fileName);
      }
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
    query: (body: CheckNapasRequestProps) => {
      const {tokenEsign, ...rest} = body;
      return {
        url: getPath('/sale-import/check-napas'),
        method: 'post',
        data: rest,
        headers: {
          'sale-import-token': tokenEsign,
        },
      };
    },
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
    query: (body: CheckEKYCRequestProps) => {
      const {tokenEsign, ...rest} = body;
      return {
        url: getPath('/sale-import/check-ekyc'),
        method: 'post',
        data: rest,
        headers: {
          'sale-import-token': tokenEsign,
        },
      };
    },
  }),
  verifyEKYC: builder.mutation<void, VerifyEKYCRequestProps>({
    query: (body: VerifyEKYCRequestProps) => {
      const form = new FormData();
      form.append('id', body.id);
      form.append('idCardNumber', body.idCardNumber);
      if (
        body?.idCardIssuedAt &&
        body?.idCardIssuedBy &&
        body?.selfiePhoto &&
        body?.frontSidePhoto &&
        body?.backSidePhoto
      ) {
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
        form.append(
          'frontSide',
          JSON.parse(
            JSON.stringify({
              uri: body.frontSidePhoto.uri,
              name: body.frontSidePhoto.name,
              type: body.frontSidePhoto.type,
            }),
          ),
        );
        form.append(
          'backSide',
          JSON.parse(
            JSON.stringify({
              uri: body.backSidePhoto.uri,
              name: body.backSidePhoto.name,
              type: body.backSidePhoto.type,
            }),
          ),
        );
      }
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
      if (
        body?.selfiePhoto &&
        body?.frontSidePhoto &&
        body?.backSidePhoto &&
        body?.selfieFileName &&
        body?.frontSideFileName &&
        body?.backSideFileName &&
        body?.idCardIssuedAt &&
        body?.idCardIssuedBy
      ) {
        form.append('idCardIssuedAt', body.idCardIssuedAt);
        form.append('idCardIssuedBy', body.idCardIssuedBy);
        form.append('selfiePhoto', body.selfiePhoto, body.selfieFileName);
        form.append('frontSide', body.frontSidePhoto, body.frontSideFileName);
        form.append('backSide', body.backSidePhoto, body.backSideFileName);
      }
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
    query: (body: SaleSelfCertRequestProps) => {
      const {tokenEsign, ...rest} = body;
      return {
        url: getPath('/sale-import/esign/sale-cert'),
        method: 'post',
        data: rest,
        headers: {
          'sale-import-token': tokenEsign,
        },
      };
    },
  }),
  signContract: builder.mutation<
    SignContractResponseProps,
    SignContractRequestProps
  >({
    query: (body: SignContractRequestProps) => {
      const {tokenEsign, ...rest} = body;
      return {
        url: getPath('/sale-import/esign/sign-contract'),
        method: 'post',
        data: rest,
        headers: {
          'sale-import-token': tokenEsign,
        },
      };
    },
  }),
  resendOTPSignContract: builder.mutation<
    ResendOTPSignContractResponseProps,
    ResendOTPSignContractRequestProps
  >({
    query: (body: ResendOTPSignContractRequestProps) => {
      const {tokenEsign, ...rest} = body;
      return {
        url: getPath('/sale-import/esign/resend-otp'),
        method: 'post',
        data: rest,
        headers: {
          'sale-import-token': tokenEsign,
        },
      };
    },
  }),
  updateEKYC: builder.mutation<void, UpdateEKYCRequestProps>({
    query: (body: UpdateEKYCRequestProps) => {
      const {tokenEsign, ...rest} = body;
      return {
        url: getPath('/sale-import/update-ekyc'),
        method: 'post',
        data: rest,
        headers: {
          'sale-import-token': tokenEsign,
        },
      };
    },
  }),
});
