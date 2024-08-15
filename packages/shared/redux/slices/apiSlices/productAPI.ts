import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';
import {
  ProductGroupProps,
  ProductDetailResponseProps,
} from '@lfvn-customer/shared/types/services/productTypes';
import {getPath} from './config';

export const productAPI = (
  builder: EndpointBuilder<BaseQueryFn, never, 'LFVN-API'>,
) => ({
  getProductList: builder.query<ProductGroupProps, void>({
    query: () => ({
      url: getPath('/product-group'),
      method: 'get',
    }),
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
