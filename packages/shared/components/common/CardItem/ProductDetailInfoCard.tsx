import React from 'react';
import {Text, View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {Icon, IconKeys} from '@lfvn-customer/shared/components/common/Icon';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {BaseCard} from './BaseCard';

export type ProductDetailInfoCardProp = {
  iconName: IconKeys;
  title?: string;
  description?: string;
  description2?: string;
  onPress?: () => void;
};

export const ProductDetailInfoCard = ({
  iconName,
  title,
  description,
  description2,
  onPress,
}: ProductDetailInfoCardProp) => {
  const {theme} = useGetTheme();

  const {textNegative500} = theme;

  return (
    <BaseCard>
      <View style={tw.style('flex flex-row items-center mr-2.5')}>
        <View style={tw.style('mx-1.5')}>
          <Icon name={iconName} disabled />
        </View>
        <View style={tw.style('flex-col min-h-13 justify-center flex-1 ml-3')}>
          <Text style={tw.style(`${textNegative500} font-semibold mb-1`)}>
            {title}
          </Text>
          <Text style={tw.style(`text-gray-400 ${textNegative500}`)}>
            {description}
          </Text>
          {description2 && (
            <Text style={tw.style(`text-gray-400 ${textNegative500}`)}>
              {description2}
            </Text>
          )}
        </View>
      </View>
    </BaseCard>
  );
};
