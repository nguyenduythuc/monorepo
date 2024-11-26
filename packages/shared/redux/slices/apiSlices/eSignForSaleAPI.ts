import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {
  SaleimportDocsUploadWebRequestProps,
  VerifySaleRequestProps,
  CheckNapasRequestProps,
  CheckNapasResponseProps,
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
});
