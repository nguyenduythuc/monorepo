import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {
  ProductGroupProps,
  ProductDetailResponseProps,
} from '@lfvn-customer/shared/types/services/productTypes';
import {getPath} from './config';
import {ApiTagType} from '@lfvn-customer/shared/types';

export const productAPI = (
  builder: EndpointBuilder<BaseQueryFn, ApiTagType, 'LFVN-API'>,
) => ({
  getProductList: builder.query<ProductGroupProps, void>({
    query: () => ({
      url: getPath('/product-group'),
      method: 'get',
    }),
    providesTags: ['Product'],
  }),
  getProductById: builder.query<
    ProductDetailResponseProps,
    {productId: number}
  >({
    query: ({productId}) => ({
      url: getPath(`/product-group/${productId}`),
      method: 'get',
    }),
  }),
});
