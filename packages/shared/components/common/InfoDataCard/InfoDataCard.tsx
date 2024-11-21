import {View, Text} from 'react-native';
import React from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {Icon} from '../Icon';
import {
  ekycDataType,
  mapEkycKeyValue,
  profileInformationType,
  mapProfileInformationValue,
} from '@lfvn-customer/shared/types/services/verifyCustomerTypes';

import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
// import {LoanReviewInfoProps} from '@lfvn-customer/shared/types/services/loanTypes';

type InfoDataCardProps = {
  cardRawData: profileInformationType;
};

type InputType = {
  [key: string]: {[key: string]: string} | string;
};

type TransformedType = {[key: string]: {[key: string]: string} | string};

export const InfoDataCard: React.FC<InfoDataCardProps> = ({cardRawData}) => {
  const t = useTranslations();

  const transformObjectWithMapping = (
    input: InputType,
    innerKeyMap: typeof mapEkycKeyValue,
    outerKeyMap: typeof mapProfileInformationValue,
  ): TransformedType => {
    const transformed: TransformedType = {};

    // Check if input has outer keys mapped in outerKeyMap
    Object.keys(input).forEach(outerKey => {
      const mappedOuterKey =
        outerKeyMap[outerKey as keyof typeof outerKeyMap] || outerKey;

      // Handle nested object mapping for mappedOuterKey
      if (
        typeof input[outerKey] === 'object' &&
        !Array.isArray(input[outerKey])
      ) {
        const innerObject = input[outerKey] as {[key: string]: string};
        const newInnerObject: {[key: string]: string} = {};

        Object.keys(innerObject).forEach(innerKey => {
          const mappedInnerKey =
            innerKeyMap[innerKey as keyof typeof innerKeyMap] || innerKey;
          newInnerObject[mappedInnerKey] = innerObject[innerKey];
        });

        transformed[mappedOuterKey] = newInnerObject;
      } else {
        // If no outer key mapping, treat input as a flat object
        const newInnerObject: {[key: string]: string} = {};
        Object.keys(input).forEach(innerKey => {
          const mappedInnerKey =
            innerKeyMap[innerKey as keyof typeof innerKeyMap] || innerKey;
          newInnerObject[mappedInnerKey] = input[innerKey] as string;
        });
        return newInnerObject;
      }
    });

    return transformed;
  };

  return (
    <View style={tw.style('border border-[#E5E5E5] px-4 rounded-lg py-1 my-3')}>
      {Object.entries(
        transformObjectWithMapping(
          cardRawData,
          mapEkycKeyValue,
          mapProfileInformationValue,
        ),
      ).map(([key, outerValue]) => (
        <View key={key}>
          {key === 'untitled' ? (
            <></>
          ) : (
            <Text style={tw.style('font-bold mt-2 text-base')}>
              {t(`${key}`)}
            </Text>
          )}
          {Object.entries(outerValue).map(([key, value], index) => (
            <View
              key={key}
              style={tw.style([
                'flex-row flex-1 border-[#E5E5E5] py-2.5 ',
                index !== Object.keys(outerValue).length - 1 ? 'border-b' : '',
              ])}>
              <View style={tw.style('w-1/2')}>
                <Text style={tw.style('text-[#999999] text-base')}>
                  {t(`${key}`)}:
                </Text>
              </View>

              <View style={tw.style('w-1/2 flex justify-end items-end')}>
                <Text style={tw.style('font-semibold text-base text-right')}>
                  {value}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ))}
      {/* {Object.entries(renamedData).map(([key, value], index) => (
        <View
          key={key}
          style={tw.style([
            'flex-row flex-1 border-[#E5E5E5] py-2.5 ',
            index !== Object.keys(renamedData).length - 1 ? 'border-b' : '',
          ])}>
          <View style={tw.style('w-1/2')}>
            <Text style={tw.style('text-[#999999] text-base')}>
              {t(`${key}`)}:
            </Text>
          </View>

          <View style={tw.style('w-1/2 flex justify-end items-end')}>
            <Text style={tw.style('font-semibold text-base text-right')}>
              {value}
            </Text>
          </View>
        </View>
      ))} */}
      {/* {Object.entries(renamedData).map(([key, value], index) => (
        <View
          key={key}
          style={tw.style([
            'flex-row flex-1 border-[#E5E5E5] py-2.5 ',
            index !== Object.keys(renamedData).length - 1 ? 'border-b' : '',
          ])}>
          <View style={tw.style('w-1/2')}>
            <Text style={tw.style('text-[#999999] text-base')}>
              {t(`${key}`)}:
            </Text>
          </View>

          <View style={tw.style('w-1/2 flex justify-end items-end')}>
            <Text style={tw.style('font-semibold text-base text-right')}>
              {value}
            </Text>
          </View>
        </View>
      ))} */}
    </View>
  );
};
