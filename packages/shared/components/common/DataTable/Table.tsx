import React, {FC, useState} from 'react';
import {View, ViewStyle} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {DataTableColumn} from '@lfvn-customer/shared/components';
import {Pagination} from '../Pagination';

export type DataRowProps = {};
const ITEM_PER_PAGE = 10;

export type TableColumn = {
  id: string;
  rawData?: any;
  rowStyles?: Array<ViewStyle | null>;
  data: (string | object)[];
  isPrint?: boolean;
  dataRaw?: any;
};

export type CustomTableProps = {
  data: TableColumn[];
  headers: string[];
  columnWidth: number[];
  maxHeight?: number;
  fixedLeftColumn?: boolean;
  fixedRightColumn?: boolean;
  columnStyles?: string[];
  onRowPress: (row: TableColumn) => void;
  hasAction?: boolean;
};

export const CustomTable: FC<CustomTableProps> = ({
  data,
  headers,
  columnWidth,
  fixedLeftColumn,
  fixedRightColumn,
  columnStyles = [],
  onRowPress,
  hasAction,
}) => {
  const totalResult = 50;
  const getRowData = (rowData: TableColumn) => {
    onRowPress(rowData);
  };

  const [page, setPage] = useState(1);

  let totalWidth = columnWidth.reduce((a, b) => a + b, 0);

  return (
    <View
      style={tw`max-w-full w-[${totalWidth}px] border border-gray-300 rounded-xl overflow-hidden`}>
      <View style={tw`flex flex-row`}>
        <View style={tw`flex-1`}>
          <View>
            <DataTableColumn
              headerTitle={headers}
              headerStyle={`border-r`}
              columnWidth={columnWidth}
              columnStyles={columnStyles}
              data={data}
              fixedLeftColumn={fixedLeftColumn}
              fixedRightColumn={fixedRightColumn}
            />
          </View>
        </View>
      </View>
      <Pagination
        page={page}
        itemPerPage={ITEM_PER_PAGE}
        total={totalResult}
        numberOfPages={Math.ceil(totalResult / ITEM_PER_PAGE) || 1}
        onPageChange={newPage => setPage(newPage)}
      />
    </View>
  );
};
