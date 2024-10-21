import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {
  GetFileRequestProps,
  GetUserResourceRequestProps,
  UploadUserResourceRequestProps,
} from '@lfvn-customer/shared/types/services/authTypes';
import {getPath} from './config';
import {ApiTagType} from '@lfvn-customer/shared/types';
import {UserResourceProps} from '@lfvn-customer/shared/types/models/authModel';

export const fileAPI = (
  builder: EndpointBuilder<BaseQueryFn, ApiTagType, 'LFVN-API'>,
) => ({
  uploadUserResource: builder.mutation<
    UserResourceProps,
    UploadUserResourceRequestProps
  >({
    query: (body: UploadUserResourceRequestProps) => {
      const form = new FormData();
      form.append('resourceType', body.resourceType);
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
      form.append('login', body.login);
      return {
        url: getPath('/user-resource/add'),
        method: 'post',
        data: form,
      };
    },
  }),
  getUserResource: builder.query<
    UserResourceProps[],
    GetUserResourceRequestProps
  >({
    query: ({userId}) => ({
      url: getPath(`/user-resource/get-by-type?login=${userId}`),
      method: 'get',
    }),
  }),
  getFile: builder.query<void, GetFileRequestProps>({
    query: ({fileName}) => ({
      url: getPath(`/files/download/${fileName}`),
      method: 'get',
    }),
  }),
});
