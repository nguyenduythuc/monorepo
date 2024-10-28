import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {
  CheckTRandProductRequestProps,
  CheckTRandProductResponseProps,
  CreateAPLResponseProps,
  CreateFolderEcmRequestProps,
  CreateFolderEcmResponseProps,
  FindCifInfoRequestProps,
  FindCifInfoResponseProps,
  MetaDataRequestProps,
  PreCheckRequestProps,
  PreCheckResponseProps,
  RequestPendingByUserRequestProps,
  RequestPendingByUserResponseProps,
  RequestPendingRequestProps,
  RequestPendingResponseProps,
  SubmitRbpInfoRequestProps,
  SubmitRbpInfoResponseProps,
  SubmmitSuggestTRRequestProps,
  SubmmitSuggestTRResponseProps,
  UploadDocumentEcmRequestProps,
  UploadDocumentEcmResponseProps,
  UploadDocumentEcmWebRequestProps,
} from '@lfvn-customer/shared/types/services/loanTypes';
import {getPath} from './config';
import {ApiTagType} from '@lfvn-customer/shared/types';
export const loanAPI = (
  builder: EndpointBuilder<BaseQueryFn, ApiTagType, 'LFVN-API'>,
) => ({
  preCheck: builder.mutation<PreCheckResponseProps, PreCheckRequestProps>({
    query: (body: PreCheckRequestProps) => ({
      url: getPath('/pre-check'),
      method: 'post',
      data: body,
    }),
  }),
  requestPendingByUser: builder.mutation<
    RequestPendingByUserResponseProps,
    RequestPendingByUserRequestProps
  >({
    query: (body: RequestPendingByUserRequestProps) => ({
      url: getPath('/request-pending/find-by-user'),
      method: 'post',
      data: body,
    }),
  }),
  saveDaftAPL: builder.mutation<
    RequestPendingResponseProps,
    RequestPendingRequestProps
  >({
    query: (body: RequestPendingRequestProps) => ({
      url: getPath('/request-pending'),
      method: 'post',
      data: body,
    }),
  }),
  createAPL: builder.mutation<CreateAPLResponseProps, MetaDataRequestProps>({
    query: (body: MetaDataRequestProps) => ({
      url: getPath('/create-apl'),
      method: 'post',
      data: body,
    }),
  }),
  getCifInfo: builder.query<FindCifInfoResponseProps, FindCifInfoRequestProps>({
    query: (query: FindCifInfoRequestProps) => ({
      url: getPath(`/find-cif-apl?flowId=${query.flowId}`),
      method: 'get',
    }),
  }),
  checkTRAndProduct: builder.mutation<
    CheckTRandProductResponseProps,
    CheckTRandProductRequestProps
  >({
    query: (body: CheckTRandProductRequestProps) => ({
      url: getPath('/topup-refinance/check-by-cifid'),
      method: 'post',
      data: body,
    }),
  }),
  submitSuggestTR: builder.mutation<
    SubmmitSuggestTRResponseProps,
    SubmmitSuggestTRRequestProps
  >({
    query: (body: SubmmitSuggestTRRequestProps) => ({
      url: getPath('/submit-topup-suggest-tr'),
      method: 'post',
      data: body,
    }),
  }),
  submitRbpInfo: builder.mutation<
    SubmitRbpInfoResponseProps,
    SubmitRbpInfoRequestProps
  >({
    query: (body: SubmitRbpInfoRequestProps) => ({
      url: getPath('/submit-rbp-info'),
      method: 'post',
      data: body,
    }),
  }),
  createFolderEcm: builder.mutation<
    CreateFolderEcmResponseProps,
    CreateFolderEcmRequestProps
  >({
    query: (body: CreateFolderEcmRequestProps) => ({
      url: getPath('/create-folder-ecm'),
      method: 'post',
      data: body,
    }),
  }),
  uploadDocumentEcm: builder.mutation<
    UploadDocumentEcmResponseProps,
    UploadDocumentEcmRequestProps
  >({
    query: (body: UploadDocumentEcmRequestProps) => {
      const form = new FormData();
      form.append('objectid', body.objectid);
      form.append('docType', body.docType);
      form.append('docName', body.docName);
      form.append('fileType', body.fileType);
      form.append('identity', body.identity);
      form.append(
        'file',
        JSON.parse(
          JSON.stringify({
            uri: body.file.uri,
            name: body.file.name,
            type: body.file.type,
          }),
        ),
      );
      return {
        url: getPath('/upload-document-ecm'),
        method: 'post',
        data: form,
      };
    },
  }),
  uploadDocumentEcmWeb: builder.mutation<
    UploadDocumentEcmResponseProps,
    UploadDocumentEcmWebRequestProps
  >({
    query: (body: UploadDocumentEcmWebRequestProps) => {
      const form = new FormData();
      form.append('objectid', body.objectid);
      form.append('docType', body.docType);
      form.append('docName', body.docName);
      form.append('fileType', body.fileType);
      form.append('identity', body.identity);
      form.append('file', body.file, body.fileName);
      return {
        url: getPath('/upload-document-ecm'),
        method: 'post',
        data: form,
      };
    },
  }),
});
