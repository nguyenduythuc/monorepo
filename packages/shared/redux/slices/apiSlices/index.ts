import { createApi } from '@reduxjs/toolkit/query/react';
import { testAPI } from './testAPI';
import axiosBaseQuery from './config';

export const apiSlice = createApi({
  reducerPath: 'LFVN-API',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://0391d680-28c5-4954-8ba8-df1b2dfdd85b.mock.pstmn.io' }),
  endpoints: (builder) => ({
    ...testAPI(builder),
  }),
});

export const { useGetExampleQuery, useSetExampleMutation } = apiSlice;
