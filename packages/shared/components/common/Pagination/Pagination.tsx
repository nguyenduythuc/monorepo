import React, {FC, useEffect, useMemo} from 'react';
import {View, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {ArrowButton} from './ArrowButton';
import {PageSelectButton} from './PageSelectButton';

type PaginationProps = {
  page: number;
  itemPerPage: number;
  total: number;
  numberOfPages: number;
  onPageChange: (page: number) => void;
};

export const PAGE_TO_SHOW = 10;

export const Pagination: FC<PaginationProps> = ({
  page,
  itemPerPage,
  total,
  numberOfPages,
  onPageChange,
}) => {
  const fromIdx = (page - 1) * itemPerPage;
  const toIdx = Math.min(fromIdx + itemPerPage, total);

  return (
    <View
      style={tw`flex flex-row relative border-t border-[#C0E1FF] px-3 py-2 justify-between`}>
      <View style={tw`flex flex-row items-center`}>
        <Text style={tw`text-base font-medium`}>
          {fromIdx + 1}-{toIdx}/{total} result
        </Text>
      </View>
      <View style={tw`flex flex-row items-center`}>
        <ArrowButton
          icon="arrow-right"
          iconColor="gray"
          onPress={() => onPageChange(page - 1)}
          disabled={page <= 1}
          rotate
        />
        <View style={tw`mx-2`}>
          <PageSelectButton
            label={page}
            items={[...Array(numberOfPages).keys()]}
            onChange={page => onPageChange(page)}
          />
        </View>

        <ArrowButton
          icon="arrow-right"
          iconColor="gray"
          onPress={() => onPageChange(page + 1)}
          disabled={numberOfPages === 0 || page === numberOfPages}
        />
      </View>
    </View>
  );
};
