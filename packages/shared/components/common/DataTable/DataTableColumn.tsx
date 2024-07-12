import React, {useState} from 'react';
import tw from 'twrnc';
import {View, ScrollView} from 'react-native';
import {DataTableTitle} from './DataTableTitle';
import {FC, useRef} from 'react';
import {DataTableCell} from './DataTableCell';
import {TableColumn} from './Table';
import {CustomButton} from '../Button';

type DataTableColumnProp = {
  headerTitle: string[];
  columnStyles?: string[];
  headerStyle?: string;
  data: TableColumn[];
  fixedLeftColumn?: boolean;
  fixedRightColumn?: boolean;
  mainColumn?: boolean;
  columnWidth: number[];
};

export const DataTableColumn: FC<DataTableColumnProp> = ({
  headerTitle,
  columnStyles = [],
  headerStyle,
  data,
  fixedLeftColumn,
  fixedRightColumn,
  columnWidth,
}) => {
  const [scrollX, setScrollX] = useState(0);

  return (
    <View style={tw`flex flex-row`}>
      {fixedLeftColumn && (
        <DetailDataTableColumn
          headerTitle={headerTitle}
          data={data}
          columnWidth={columnWidth}
          fixedLeftColumn
          headerStyle={headerStyle}
          columnStyles={columnStyles}
        />
      )}
      <ScrollView
        horizontal={true}
        bounces={false}
        contentContainerStyle={tw`flex`}
        scrollEventThrottle={16}
        onScroll={e => {
          const {x} = e.nativeEvent.contentOffset;
          setScrollX(x);
        }}>
        <DetailDataTableColumn
          headerTitle={headerTitle}
          data={data}
          columnWidth={columnWidth}
          headerStyle={headerStyle}
          mainColumn
          fixedLeftColumn={fixedLeftColumn}
          fixedRightColumn={fixedRightColumn}
          columnStyles={columnStyles}
        />
      </ScrollView>
      {fixedRightColumn && (
        <DetailDataTableColumn
          headerTitle={headerTitle}
          data={data}
          columnWidth={columnWidth}
          fixedRightColumn
          headerStyle={headerStyle}
          columnStyles={columnStyles}
        />
      )}
    </View>
  );
};

export const DetailDataTableColumn: FC<DataTableColumnProp> = ({
  columnWidth,
  columnStyles = [],
  headerTitle,
  fixedLeftColumn,
  fixedRightColumn,
  mainColumn,
  headerStyle,
  data,
}) => {
  const leftRef = useRef<ScrollView>(null);
  const rightRef = useRef<ScrollView>(null);
  const isLeftScroll = useRef(false);

  const fixedRightIndex = headerTitle.length - 1;

  const offsetLeft = mainColumn && fixedLeftColumn ? 1 : 0;

  const offsetRight = mainColumn && fixedRightColumn ? -1 : 0;

  const colData = (index: number) => {
    let deepClonedArray = data[index];

    if (mainColumn) {
      let newMainColArray = deepClonedArray.data;
      if (fixedLeftColumn) {
        newMainColArray = newMainColArray.slice(offsetLeft);
      }
      if (fixedRightColumn) {
        newMainColArray = newMainColArray.slice(0, offsetRight);
      }
      return newMainColArray;
    } else if (fixedLeftColumn) {
      return [deepClonedArray.data[0]];
    } else if (fixedRightColumn) {
      return [deepClonedArray.data[fixedRightIndex]];
    }
    return [deepClonedArray.data];
  };

  const colHeader = () => {
    if (mainColumn) {
      let newHeader = headerTitle;
      if (fixedLeftColumn) {
        newHeader = newHeader.slice(offsetLeft);
      }
      if (fixedRightColumn) {
        newHeader = newHeader.slice(0, offsetRight);
      }
      return newHeader;
    }
    if (fixedLeftColumn) {
      return [headerTitle[0]];
    }
    if (fixedRightColumn) {
      return [headerTitle[fixedRightIndex]];
    }
    return headerTitle;
  };

  const colWidth = () => {
    if (mainColumn) {
      let newWidth = columnWidth;
      if (fixedLeftColumn) {
        newWidth = newWidth.slice(offsetLeft);
      }
      if (fixedRightColumn && columnWidth.length === headerTitle.length) {
        newWidth = newWidth.slice(0, offsetRight);
      }
      return newWidth;
    }
    if (fixedLeftColumn) {
      return [columnWidth[0]];
    }
    if (fixedRightColumn) {
      return [columnWidth[fixedRightIndex]];
    }

    return columnWidth.slice(0);
  };

  const colStyle = () => {
    if (mainColumn) {
      let newStyle = columnStyles;
      if (fixedLeftColumn) {
        newStyle = newStyle.slice(offsetLeft);
        console.log;
      }
      if (fixedRightColumn && columnStyles.length === headerTitle.length) {
        newStyle = newStyle.slice(0, offsetRight);
      }
      return newStyle;
    }
    if (fixedLeftColumn) {
      return [columnStyles[0]];
    }
    if (fixedRightColumn) {
      return [columnStyles[fixedRightIndex]];
    }

    return columnStyles.slice(0);
  };

  const rowColor = (index: number) => {
    return (index + 1) % 2 === 0 ? 'bg-gray-100' : '';
  };

  const fixedColumnStyle = () => {
    if (!mainColumn) {
      if (fixedLeftColumn) {
        return 'border-r border-gray-300';
      }
      if (fixedRightColumn) {
        return 'border-l border-gray-300';
      }
    }
  };

  return (
    <View style={tw`${fixedColumnStyle() || ''}`}>
      <View style={tw`flex flex-row py-2 bg-gray-200`}>
        {colHeader().map((header, index) => (
          <DataTableTitle
            style={
              mainColumn && index !== colHeader().length - 1 ? headerStyle : ''
            }
            key={index}
            width={columnWidth && colWidth()[index]}>
            {header}
          </DataTableTitle>
        ))}
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ref={fixedLeftColumn || fixedRightColumn ? leftRef : rightRef}
        bounces={false}
        horizontal={false}
        bouncesZoom={false}
        onTouchStart={() => (isLeftScroll.current = true)}
        scrollEventThrottle={16}
        contentContainerStyle={tw`flex-grow`}
        onScroll={e => {
          const {y} = e.nativeEvent.contentOffset;
          if (isLeftScroll.current) {
            fixedLeftColumn || fixedRightColumn
              ? rightRef.current?.scrollTo({y, animated: false})
              : leftRef.current?.scrollTo({y, animated: false});
          }
        }}>
        {data.map((col, colIndex) => (
          <View
            key={colIndex}
            style={tw`flex-1 flex-row border-t border-gray-300 ${rowColor(
              colIndex,
            )}`}>
            {colData(colIndex).map((cell: any, cellIndex) => (
              <DataTableCell
                key={cellIndex}
                onPress={() => console.log(columnWidth[cellIndex])}
                width={colWidth()[cellIndex]}
                textStyle={colStyle()[cellIndex]}>
                {typeof cell !== 'string' ? (
                  <View style={tw`${cell.styleWrapper}`}>
                    {cell.props.map((btt: any, bttIdx: number) => (
                      <CustomButton
                        key={bttIdx}
                        onPress={() => {}}
                        size={btt.size}
                        color={btt.color}
                        disabled={undefined}
                        variant={btt.variant}>
                        {btt.label}
                      </CustomButton>
                    ))}
                  </View>
                ) : (
                  cell
                )}
              </DataTableCell>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
