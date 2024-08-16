import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';

export const testAPI = (
  builder: EndpointBuilder<BaseQueryFn, never, 'LFVN-API'>,
) => ({
  getExample: builder.query<object, void>({
    query: () => ({url: '/get', method: 'get'}),
  }),
  setExample: builder.mutation({
    query: body => ({
      url: '/save',
      method: 'post',
      data: body,
    }),
  }),
});
