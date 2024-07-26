import {BaseQueryFn} from '@reduxjs/toolkit/query';
import axios, {AxiosRequestConfig, AxiosError} from 'axios';

const axiosBaseQuery =
  ({
    baseUrl,
  }: {
    baseUrl: string;
  }): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({url, method, data, params}, {getState}) => {
    const token = (getState() as any).auth.token;
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: token ? {Authorization: `Bearer ${token}`} : undefined,
      });
      return {data: result.data};
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
