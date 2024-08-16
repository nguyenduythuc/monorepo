import {BaseQueryFn} from '@reduxjs/toolkit/query';
import axios, {AxiosRequestConfig, AxiosError} from 'axios';
import {Platform} from 'react-native';

export enum ApiType {
  Public = 'public',
  Private = 'private',
}

export const getPath = (path: string, type?: ApiType) => {
  let newPath = type === 'public' ? `/public${path}` : `/api${path}`;
  newPath = Platform.OS === 'web' ? `/api-app${newPath}` : newPath;
  return newPath;
};

let token = '';
export const setAppToken = (newToken: string) => {
  token = newToken;
};

export const getToken = () => {
  return token;
};

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
    const savedToken = getToken();
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: savedToken
          ? {Authorization: `Bearer ${savedToken}`}
          : undefined,
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
