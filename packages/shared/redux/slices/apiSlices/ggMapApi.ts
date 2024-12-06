import {BaseQueryFn, EndpointBuilder} from '@reduxjs/toolkit/query';

import {ApiTagType} from '@lfvn-customer/shared/types';
import Config from 'react-native-config';
import {getPlaceAutoCompleteResponseProps} from '../../../types/services/ggMapServiceType';

export const ggMapAPI = (
  builder: EndpointBuilder<BaseQueryFn, ApiTagType, 'LFVN-API'>,
) => ({
  getPlaceAutoComplete: builder.query<
    getPlaceAutoCompleteResponseProps,
    {searchText: string}
  >({
    query: ({searchText}) => ({
      url: `/place/autocomplete/json?input${searchText}&key=${Config.G_MAP_API_KEY}`,
      method: 'get',
    }),
  }),
});
